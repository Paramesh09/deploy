require('dotenv').config();
const bcrypt=require('bcryptjs')
const express = require("express");
const app = express();
//const Joi=require('joi')
const jwt =require('jsonwebtoken');
const { PASSWORD } = require('./app/Configure/db.configure');


app.use(express.json());

app.post('/secure',async(req,res)=>{
    const saltRound=10;
    const password="1234"
    const salt =await bcrypt.genSalt(saltRound).then(salt=>{
        return bcrypt.hash(password,salt)
    })
    console.log('salt',salt)

    const hash =await bcrypt.genSalt(saltRound).then(hash=>{
        return bcrypt.hash(password,hash)
    })

    
    console.log('hash',hash)

    const secure= await bcrypt.hash(salt,hash)

console.log('secure',secure)
    res.send(req.body)
})



// posts=[
//     {name:"paramesh",titlt:"post1"},
//   {name:"rajaram",titlt:"post2"}]

  
// const authenticateToken=(req,res,next)=>{
//     const authHeader=req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if(!token) return res.sendStatus(401);

//      jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//         if(err){
//             return res.sendStatus(403);
//         }
//         req.user = user;
//         next();
//      })

   
// }

// // app.get('/get',(req,res)=>{
// //     res.send(posts)
// // }) 
// app.post('/login',(req,res)=>{
//     //authentication
//    const username=req.body.name;
//    const user={name:username}
//    const accessToken =jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
//    res.json({accessToken:accessToken})
// })
// app.get('/post',authenticateToken,(req,res)=>{
//     console.log("hhhhh",req.user.name);
//      res.json(posts.filter(obj=>obj.name===req.user.name))
     
// })



const port = process.env.PORT || 8000;

//Listen Port
app.listen(port, () => {
    console.log("Runnging : " + port);
});