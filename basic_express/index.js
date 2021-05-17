//https://www.youtube.com/watch?v=lY6icfhap2o
const express = require('express')
const app = express()

app.use(logger)// global middleware , now it runs before every express middleware, middleware execute in order of placement , so that if you want its execution before express middlewares place it on top 

app.get('/',(req,res)=>{    //this is also a middleware , but no next here as it has no other middleware to call after 
    res.send("home page")
})
app.get('/users',auth,(req,res)=>{   //2 middleware passed 
    console.log(`user is =${req.admin}`)
    res.send("Users page")
})


function logger(req,res,next){      //logger middleware //next is a function ,
    console.log('LOG')
    next()//next piece of middleware in line is going to run when we call next
}
function auth(req,res,next){      //now we want this middleware specific to a single action 
    if(req.query.admin==='true'){//we can access req and res params in middleware

    req.admin= true; //we can set custom vars on req object that we be passed to next middleware via req
    next() 
    }else{
        res.send('No Auth')
    }
    // console.log('Auth')
    // next()
}

app.listen(2000)

//Note: next() doesnt work like return , when next() i called we go to next middleware and execute it , then we come back and execute the leftover code after the next()//if you want to stop executing just put a 'return' after next()