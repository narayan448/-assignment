const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");
const validator = require("validator");

const srecord = new mongoose.Schema({
    sname:{
        type:String,
        required:true,
        minlength:4,
        maxlength:25
     },
     email:{
         type:String,
         required:true,
         unique:[true, 'email aleready in my record'],
         validate(value){
             if(!validator.isEmail(value))
             throw new error ('invalid email')
         }
     },
     phoneno:{
         type:Number,
         required:true,
         unique:[true, 'number is already present'],
         min:10
     },
     date:{
         type:Date,
         default:Date.now()
     }

})


//create collections

const student_record = new mongoose.model('student_record', srecord);

module.exports = student_record;