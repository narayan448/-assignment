const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/assignment_database').then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})
