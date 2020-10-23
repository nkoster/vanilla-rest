const Product = require('../models/productModels')

// GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Owned-By': 'Niels-da-Piels'
        })
        res.end(JSON.stringify(products))  
    } catch (error) {
        console.log(error)
    }
}

// GET /api/products/:id
const getProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Owned-By': 'Niels-da-Piels'
            })
            res.end(JSON.stringify({message: `Product ${id} not found`}))
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Owned-By': 'Niels-da-Piels'
            })
            res.end(JSON.stringify(product))
        }

        res.end(JSON.stringify(product))  
    } catch (error) {
        console.log(error)
    }
}

// POST /api/products
const createProduct = async (req, res) => {
    try {
        const product = {
            title: 'test product',
            description: 'This a test',
            price: 100
        }
        const newProduct = await Product.create(product)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(newProduct))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct
}
