const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://projectx061:projectbca24@cluster0.n4wn0ea.mongodb.net/db1?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));



let sc=mongoose.Schema;
const userschema=new sc({
    email:String,
    password:String
});

var loginmodel=mongoose.model("login",userschema)
module.exports=loginmodel;