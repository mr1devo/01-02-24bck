const mongoose =require("mongoose")
mongoose.connect("mongodb+srv://projectx061:projectbca24@cluster0.n4wn0ea.mongodb.net/db1?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));


let sr=mongoose.Schema;
const Signupschema=new sr({
  username: String,
  email: String,
  password: String,
});

var Signupmodel=mongoose.model("Signup",Signupschema)
module.exports=Signupmodel;