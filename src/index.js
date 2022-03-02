const express = require('express');
const app = express();
require('./db/conn.js');
const user = require('./db/models/usercreation')
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const srecord = require('./db/models/srecord');
const student_record = require('./db/models/srecord');



//setting the path
const static_path = path.join(__dirname,'..//public');
const temp_path = path.join(__dirname,'..//template//views')
const partials_path = path.join(__dirname,'..//template//partials');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//set views engine

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', temp_path);
hbs.registerPartials(partials_path);



app.get('/',(req, res) =>{
    // res.send("hello world");
    res.render('index.hbs');
})
app.get('/',(req, res) => {
    res.send("this is the main page ")
})
app.get('/userpage',(req, res)=>{
    res.render('userpage.hbs');
})

app.get('/login',(req, res)=>{
    res.render('login.hbs');
})

app.get('/crud',(req,res)=>{
    res.render('crud.hbs');



})
app.post('/userpage', async(req, res)=>{
    try{
         
       const usercreation = new user({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password
       })
       
       //generate token function 
       const token = await usercreation.generateAuthToken();


        const create = await usercreation.save();
        res.status(201).send('user created successfully');

    }catch(err){
        res.send(err);
    }
})

app.post('/login', async (req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const useremail = await user.findOne({email:email})
        const isMatch = await bcrypt.compare(password, useremail.password);

        // generate token before user login
        const token = await useremail.generateAuthToken();
        console.log(`the login token is ${token}`);


        if(isMatch){
            res.status(201).render("crud.hbs")


        }
        else{
            res.status(400).send('invalid email');
        }

    }catch(err){
        res.status(400).send("invalid email");
    }
})

app.get('/display', async (req,res) =>{
   try{
       const studentdata = await student_record.find();
       res.send(studentdata);
       return 
    
   }catch(err){
       res.status(400).send(`the error is ${err}`)
   }
})


app.post('/display', async(req, res)=>{
    try{
        const record = new student_record({
            sname:req.body.sname,
            email:req.body.email,
            phoneno:req.body.phoneno
        })
        await record.save();
        res.status(201).render('crud.hbs');

    }catch(err){
        res.status(400).send(`the error is ${err}`);
    }
})

app.delete('/display/:id',async (req, res)=>{
    try{
        
        const delete_record = await student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(404).send()
        }
        else
        { res.send(delete_record)}
       
    }catch(err){
        res.status(400).send(err);
    }
})


app.patch('/display/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const update_document = await findByIdAndUpdate(_id, req.body,true);
        if(!req.params.id){
            res.status(404).send()
        }

        res.send(update_document);
    }catch(er){
        res.status(400).send(er)
    }
})




app.listen(port, () =>{
    console.log(`conecting on the port ${port}`);
})