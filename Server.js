const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')

const app=express()

// for data base connection
app.use(bodyParser.json())
const mongooseUrl='mongodb://localhost:27017/CRM1'
mongoose.connect(mongooseUrl).then(()=>{
    console.log('Connected to MongoDB')
}).catch(()=>{
    console.log('Error connecting to MongoDB')
})
//-------------------------


const signUpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // unique: true
  },
  password: {
    type: Number,
    required: true,
  },
  username:{
    type:String,
    required:true
  }
});

const Signup = mongoose.model('Signup', signUpSchema);

// app.post('/api/signup',async(req,res)=>{
//     // res.status(200).json({message:'data recived'})
//     console.log("data recevide")
//     try{
//         const {email, password, username}=req.body
//         if(!email||!password||!username){
//             return res.status(400).json({message:'Please fill all the fields'})
//         }

//         const newSignup=new Signup({
//             email,password,username
//         })

//         await newSignup.save()
//         res.status(201).json({message:'Signup saved'})
//     }
//     catch(error){
//         res.status(500).send({message:'Error Occured in post'})
//     }
// })

// Signup route
//Post Api
app.post('/api/signup',async(req,res)=>{
  try{
  const {email,password,username}=req.body;
  // check for missing feilds
  if(!email||!password||!username){
    return res.status(400).json({message:'Please enter all fields'})
  }
  //create  a new product instance
  const newSignup= new Signup({
   email,
   password,
   username
  })
    //save the  product to the database
    await   newSignup.save()
    res.status(201).json({message:'User created successfully',Signup:newSignup})
    }
    catch(error){
      console.log(error);
      res.status(500).json({message:'Error creating user'})
    }
})


app.get('/home',(req,res)=>{
    res.send('welcome to home page')
})
app.listen(3000,()=>{
    console.log('server is running on port 3000')
})