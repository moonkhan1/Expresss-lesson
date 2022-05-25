const express=require("express");
const res = require("express/lib/response");
const app =express();

const data=[
    {"id":27, name: "Adler" },
    {"id":2, name: "Mussolini" },
    {"id":7, name: "Franco" },
    {"id":6, name: "Smith" },
    {"id":2, name: "Jason" },
    {"id":89, name: "Andy" }
]
const card=[
    {"id":27, "cardNumber": 12344444234324 },
    {"id":2,  "cardNumber": 11344444234324 }
    // {"id":7,  "cardNumber": 12344444234354 },
    // {"id":6,  "cardNumber": 72344444234324},
    // {"id":2,  "cardNumber":  12344456234324}
   
]


app.use(express.json())

app.get('/',function(request,response){
  response.send("server is active")  
})

app.get('/about',function(request,response){
    response.send("It is an about page!")
})

app.get('/card',function(request,response){
    response.send("Its card page!")
})

app.get('/rahid',function(request,response){
    response.send("Its Rahid's page!")
})
app.get('/sabinalocal',function(request,response){
   const myTime=new Date().toLocaleTimeString();
   response.send(`My time is ${myTime}  `)
})

//request.params api
// app.get('/list/:id',function(request,response){
//     // console.log(request.params.id)
//     // response.json(request.params)
// let company=data.find((elem)=>(elem.id==request.params.id))
// if(company){
//     response.status(200).json(company)
// }
// else{
//     response.status(400).json("Melumat Tapilmadi")
// }

// })
//response query api
app.get('/users',function(request,response){
    // response.json(request.query)
    let id=request.query.id
    if(id){
     let company=data.find((elem)=>(elem.id==id))
     if(company){
        response.status(200).json(company)  
     }
     else{
        response.status(400).json("Melumat Tapilmadi")
     }
    }
    else{
        response.status(400).json("ID TAPILMADI!")
    }


})

//card info bank
app.get('/card/:id',function(request,response){
    let data=card.find((elem)=>(elem.id===request.params.id))

    if(data){
        response.status(200).json(data)  

    }
    response.status(400).json("Bele sohbet yoxdur")
  })


app.get('/host',function(request,response){
    response.status(200).json(request.ip)
})

app.get('/date',function(request,response){
const newDate=new Date();
response.send(newDate.toString())
})



app.listen(3000, function(){
    console.log("server is on localhost : 3000")
})

app.post("/list",function(req,res){
    // console.log()
    card.push(req.body);
    res.status(200).send(card);
})

app.put('/list/:id',function(req,res){
    const id=parseInt(req.params.id);
    const index=card.findIndex(el=>el.id==id);

    if(index !==-1){
        const record=card[index];
        card[index]={...record,...req.body}
        res.status(202).send(card)
    }
    res.status(400).send('No card');
})

app.delete('/list/:id',function(req,res){
    const idOfUser = parseInt(req.params.id);
    if(idOfUser!==-1){
        const newcard = card.filter((el) => el.id !== idOfUser);
        res.status(202).send(newcard);
    }   
        res.status(400).send('No card');
})


const dotenv=require('dotenv').config();
const jwt =require("jsonwebtoken");
const authToken=require('./middleware')
process.env.TOKEN_SECRET;

const users=[
    {"email":"admin1@gmail.com","password":12345},
    {"email":"admin2@gmail.com","password":12345}
]
app.post('/login',function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    let data=users.find((el)=>el.email==email);
    if(data){
        if(data.password==password){
          const token=  jwt.sign(data.email, process.env.TOKEN_SECRET);
          res.status(200).json(token);
        }
    res.status(404).send("not beraber password");

    }
    res.status(404).send("not found user");

})


app.get('/user', authToken, function(req,res){
    const email =req.userEmail;
    const data=users.find((el)=>el.email==email);
    if(data){
        res.status(200).json(data);
    }
    res.status(401).send('Malformed Token')
})