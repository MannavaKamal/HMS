const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const session = require('express-session');
const cors = require('cors');
const parser = require('body-parser');
const mongoose = require('mongoose');


const app1 = express();
app1.use(parser.json());
app1.use(express.json());



// database
mongoose.connect('mongodb+srv://2200032973:jJ4ixc5JEMXC8Dhi@cluster0.s8i0c8m.mongodb.net/HMS',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));
const userSchema = new mongoose.Schema({   
     name: String,
    email: String,
    password:String,
   age: Number,
    weight: Array,  
    height: Number,  
    activityLevel: String, 
    medicalHistory: Array,
    fitnessGoals: Array
});
const User = mongoose.model('user', userSchema);
app1.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"for my project",
  
}))
app1.use(cors({
  origin: ['http://localhost:3000', 'https://your-production-domain.com'], // Add your frontend domains
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
 credentials : true
}));
app1.post('/userSignup',async(req,res)=>{
console.log(req.body)
   User.insertMany(req.body)
   return res.json({"code":10})

 })

app1.post('/userLogin',async(req,res)=>{
  const ret = await User.findOne({email:req.body.email}) 
if(ret !== null && ret.password === req.body.password){
  console.log(ret)
  return res.json(ret)
}
else{
  return res.json({"code":0})
}
})
 
app1.post("/addWeight",async(req,res)=>{
  let weight = req.body.weight
 let ret =  await User.findById(req.body._id);
    let oldweight = ret.weight;
   console.log(oldweight)
    oldweight.push(weight)
    console.log(oldweight)  // weights updates
    await User.updateOne({ 
         _id: req.body._id }, {
        $set: {
          weight: oldweight
       },
     }, { upsert: true });
     return res.json({"code":1})
})

app1.post("/userWeights",async(req,res)=>{  
 let ret =  await User.findById(req.body._id);
 console.log(ret.weight)
     return res.json(ret.weight)
})

app1.get("/getAllUsers",async(req,res)=>{  

  const all = await User.find()
  console.log(all)
      return res.json(all)
 })

app1.listen(5000,()=> console.log("route server at 5000"))

