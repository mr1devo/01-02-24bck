const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://projectx061:projectbca24@cluster0.n4wn0ea.mongodb.net/db1?retryWrites=true&w=majority")
.then(()=>{console.log("DB connected")})
.catch(err=>console.log(err));

let pd=mongoose.Schema;
const place = new pd(
    {
        placename:String,
        tsee:String,
        location:String,
        placephoto:{
            contentType:String,
            data : Buffer,
           }
       
        
        }
);

var placemodel =mongoose.model("place",place)
module.exports=placemodel;