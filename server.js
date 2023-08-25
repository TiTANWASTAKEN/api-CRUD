const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.send('hello api')
})
app.get('/blog', (req, res) => {
    res.send('hello 32api')


})
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})


app.post('/products', async (req, res) => {
    //    console.log(req.body); 
    //    res.send(req.body)
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});

app.put('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`cant find ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.delete('/products/:id',async(req,res)=>{
    try {
        const{id}= req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cant find ${id}`})

        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb+srv://admin:admin@cluster1.axvnzt6.mongodb.net/node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('mongodb swagat')
        app.listen(5000, () => {
            console.log('aaapp is running')
        })

    }).catch((error) => {
        console.log(error)
    })