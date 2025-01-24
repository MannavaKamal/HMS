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
    weight: Number,  
    height: Number,  
    activity_level: String, 
    medical_history: Array,
    fitness_goals: Array
});
const User = mongoose.model('user', userSchema);
app1.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"for my project",
  
}))
app1.use(cors({
   origin : ["*"],
 methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
   credentials : true
}
));
app1.post('/userSignup',async(req,res)=>{
console.log("kamal")
  // User.insertMany(req.body)
   return res.json({"code":10})

 })

 
app1.get('/getCurrentUser',async(req,res)=>{ 
  var filtered = jsonarr.filter(item => item.id !== req.session.data.id);
  var filtered1 = jsonarr.filter(item => item.id == req.session.data.id);
  props = {
    "source":filtered1[0],
    "destinations":filtered
  }
     return res.json(props)  
  })
  app1.post('/storeMessage',async(req,res)=>{
    const user = jsonarr.find(item => item.id === req.session.data.id);
    user.messages.push(req.body.message);  
    return res.json({"code":1})  
 })
 app1.get('/getSession',async(req,res)=>{
  if (req.session.data !== undefined) {
    return res.json({"code":1})
} else {
  return res.json({"code":0})
}
})
app1.listen(5000,()=> console.log("route server at 500"))

