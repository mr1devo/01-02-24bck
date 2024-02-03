const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://projectx061:projectbca24@cluster0.n4wn0ea.mongodb.net/db1?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));

let rd=mongoose.Schema;
const restra = new rd(
    {
        restraname:String,
        rtsee:String,
        rlocation:String,
        restraphoto:{
            data : Buffer,
            contentType:String,}
       
        
        }
);


var restramodel =mongoose.model("restra",restra)
module.exports=restramodel;