const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// create schema
const usercreation = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true, 'oops! email is also in my record'],
        validate(value){
            if (!validator.isEmail(value))
            throw new error ("invalid email");
        }
    },
  
    password:{
        type:String,
        required:true
    },
    tokens:[{token:{
        type:String,
        required:true
    }}]
})

// middelwheres
// generating tokens
usercreation.methods.generateAuthToken = async function (){
    try{
        const token = jwt.sign({_id:this._id.toString()}, "iamnarayansharmaandthisismysecratekey");
        // console.log(token); 
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(err){
        res.send(`the error is ${err}`)
        console.log(`the error is ${err}`)
    }
}





// converting in hash

usercreation.pre("save", async function(next){
        if (this.isModified("password")){
            this.password = await bcrypt.hash(this.password, 10);

        }
        next()
})

// create a collection

const user = new mongoose.model('user', usercreation);
module.exports = user;