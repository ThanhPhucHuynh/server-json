// require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose');
// const multer = require('multer')
// const path = require('path');
var cors = require('cors');
const low = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');
const app = express();
// const URL = process.env.URL_DB;
const PORT = 1234

const adapter1 = new FileSync('users.json');
const users = low(adapter1);
users.defaults({ users: [] })
    .write()


const adapter2 = new FileSync('product.json');
const product = low(adapter2);
product.defaults({ product: [] })
    .write()

const adapter3 = new FileSync('admin.json');
const admin = low(adapter3);
product.defaults({ admin: [] })
    .write()

const adapter4 = new FileSync('order.json');
const order = low(adapter4);
order.defaults({ order: [] })
    .write()


    

app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.get('/', (req, res) => {
    res.send('hello');
})
app.get('/user', (req, res) => {
    res.send(users);
})
app.get('/order', (req, res) => {
    res.send(order);
})
app.get('/admin', (req, res) => {
    res.send(admin);
})
app.get('/product', (req, res) => {
    res.send(product);
})


app.get('/user/:userEmail', (req, res) => {
    var userEmail = req.params.userEmail;
    // console.log(users.get('user').value())
    // console.log(users)  
    var flag = false;
    var b =users.get('user').value();
    for(var a of b){
        // console.log(a.email)
        if(a.email === userEmail){
            res.send({ user:a });
            flag = false;
        }
    }
    if(flag==false){
        res.send({ user: null });
    }
    // User.findOne({ email: userEmail }).then((user) => {
    //     res.send({ user });
    // }, (e) => {
    //     res.status(400).send(e);
    // })
})


app.get('/product/:typeProduct', (req, res) => {
    var typeProduct = req.params.typeProduct;
    
    var flag = false;
    var b =product.get('product').value();
    var c = []
    for(var a of b){
        // console.log(a.email)
        if(a.type === typeProduct){
            c.push(a);
        }
    }
    if(c.length===0){
        res.send({ product: null });
    }else{
        res.send({product: c})
    }
    
    // Product.find({ type: typeProduct }).then((product) => {
    //     res.send({ product });
    // }, (e) => {
    //     res.status(400).send(e);
    // })
})

app.get('/product/id/:id', (req, res) => {
    var id = req.params.id;
    var flag = false;
    var b =product.get('product').value();
    var c = []
    for(var a of b){
        // console.log(a.email)
        if(a.id === id){
            res.send({ product: a });
            flag =true;
        }
    }
    if(flag==false){
        res.send({ product: null });
    }
    

})

app.listen(PORT, () => {
    console.log('Listening on ${PORT}')
})

// order



