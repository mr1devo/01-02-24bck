//import express 
const express=require("express")
const cors=require("cors")
//initializing
const app=new express();

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

//assign port
app.listen(4005,(request,response)=>{
    console.log("port is running in 4005")
})
//api creation
app.get('/',(request,response)=>{
    response.send("hi")
})



//PLACE.jsx
const placemodel = require('./Placedetails')

// //for Submit button
// app.post('/new',(request,response)=>{
//     console.log(request.body)
//     new placemodel(request.body).save();
//     response.send("Record saved ")
// })


// //view
// app.get('/view',async(request,response)=>{
//     var data = await placemodel.find();
//     response.send(data)
// })


//delete
app.put('/remove/:id',async(request,response)=>{
    let id = request.params.id
    await placemodel.findByIdAndUpdate(id)
    response.send("Record deleted")
})

//edit
app.put('/edit/:id',async(request,response)=>
 {
     let id = request.params.id;
     await placemodel.findByIdAndUpdate(id,request.body)
     response.send("Data updated")
 })

 //SAVE
 const multer = require('multer');
 const storage = multer.memoryStorage(); // Store images in memory
 const upload = multer({ storage: storage });

app.post('/photonew', upload.single('placephoto'), async (request, response) => {
    // try {
                const { placename, tsee, location } = request.body
                const places = new placemodel({
                    placename,
                    tsee,
                    location,
                    placephoto: {
                        data: request.file.buffer,
                        contentType: request.file.mimetype,
                    }
                    
                })
                console.log(places)
                await places.save();
                response.status(200).json({ message: 'Place added successfully' });
        // }
    // catch (error) 
    // {
    //             response.status(500).json({ error: 'Internal Server Error' });
    // }
}
)


//view
app.get('/photoview', async (request, response) => {

    const result = await placemodel.aggregate([
      {
        $lookup: {
          from: 'Placedetails', // Name of the other collection
          localField: 'placename', // field of item
          foreignField: '_id', //field of category
          as: 'place',
        },
      },
    ]);
  
    response.send(result)
  })



//HOTEL.jsx
const hotelmodel = require('./Hoteldetails')

//delete
app.put('/hremove/:id',async(request,response)=>{
    let id = request.params.id
    await hotelmodel.findByIdAndUpdate(id)
    response.send("Record deleted")
})

//edit
app.put('/hedit/:id',async(request,response)=>
 {
     let id = request.params.id;
     await hotelmodel.findByIdAndUpdate(id,request.body)
     response.send("Data updated")
 })

 //save
 const hstorage = multer.memoryStorage(); // Store images in memory
 const hupload = multer({ storage: hstorage });

app.post('/hotelnew', upload.single('hotelphoto'), async (request, response) => {
    // try {
                const { hotelname, htsee, hlocation } = request.body
                const hotels = new hotelmodel({
                    hotelname,
                    htsee,
                    hlocation,
                    hotelphoto: {
                      data: request.file.buffer,
                      contentType: request.file.mimetype,
                  },
                    
                    
                    
                })
                console.log(hotels)
                await hotels.save();
                response.status(200).json({ message: 'Hotel added successfully' });
    //     }
    // catch (error) 
    // {
    //             response.status(500).json({ error: 'Internal Server Error' });
    // }
}
)

//view
app.get('/hview', async (request, response) => {

  const result = await hotelmodel.aggregate([
    {
      $lookup: {
        from: 'Hoteldetails', // Name of the other collection
        localField: 'hotelname', // field of item
        foreignField: '_id', //field of category
        as: 'hotel',
      },
    },
  ]);

  response.send(result)
})







//RESTRA.jsx
const restramodel = require('./Restradetails')

//delete
app.put('/Rremove/:id',async(request,response)=>{
    let id = request.params.id
    await restramodel.findByIdAndUpdate(id)
    response.send("Record deleted")
})

//edit
app.put('/redit/:id',async(request,response)=>
 {
     let id = request.params.id;
     await restramodel.findByIdAndUpdate(id,request.body)
     response.send("Data updated")
 })

 //save
 const rstorage = multer.memoryStorage(); // Store images in memory
 const rupload = multer({ storage: storage });

app.post('/restranew', upload.single('restraphoto'), async (request, response) => {
    // try {
                const { restraname, rtsee, rlocation } = request.body
                const restras = new restramodel({
                    restraname,
                    rtsee,
                    rlocation,
                    restraphoto: {
                        data: request.file.buffer,
                        contentType: request.file.mimetype,
                    }
                    
                })
                console.log(restras)
                await restras.save();
                response.status(200).json({ message: 'Place added successfully' });
    //     }
    // catch (error) 
    // {
    //             response.status(500).json({ error: 'Internal Server Error' });
    // }
}
)


//view
app.get('/resview', async (request, response) => {

  const result = await restramodel.aggregate([
    {
      $lookup: {
        from: 'Restradetails', // Name of the other collection
        localField: 'restraname', // field of item
        foreignField: '_id', //field of category
        as: 'restra',
      },
    },
  ]);

  response.send(result)
})



//LOGIN

const loginmodel=require("./Login")



app.post ('/loginview', async (request, response) => {
    const { email, password } = request.body;
    console.log(request.body)
    try {
      const user = await Registermodel.findOne({ email, password });
    
      if (user) {
        response.json({ success: true, message: 'Login successful' });
      }
       else {
        response.json({ success: false, message: 'Invalid Password and email' });
      }
    } catch (error) {
      response.status(500).json({ success: false, message: 'Error during login' });
    }
  });




  //Signup
  
const Registermodel=require('./Signup')



app.post('/registerview', async (request, response) => {
  const { username, email, password } = request.body;
  
    try {
      
      // Basic validation
      if (!username || !email || !password) {
        return response.status(400).json({ message: 'All fields are required' });
      }
  
      // Check if the email already exists
      const existingUser = await Registermodel.findOne({ email });
      if (existingUser) {
        return response.status(400).json({ message: 'Email already registered' });
      }
      // Create a new user
    const newUser = new Registermodel({ username, email, password });
    await newUser.save();

    response.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
});
