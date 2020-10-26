const Product = require('../models/productModels')
const { getPostData } = require('../util')

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
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', async _ => {
            const { title, description, price } = JSON.parse(body)
            const product = {
                title, description, price
            }
            const newProduct = await Product.create(product)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(newProduct))
        })
    } catch (error) {
        console.log(error)
    }
}

// PUT /api/products/:id
const updateProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Owned-By': 'Niels-da-Piels'
            })
            res.end(JSON.stringify({message: `Product ${id} not found`}))
        } else {
            const body = await getPostData(req)
            console.log('BODY', body)
            const { title, description, price } = JSON.parse(body)
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            updatedProduct = await Product.update(id, productData)
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Owned-By': 'Niels-da-Piels'                
            })
            res.end(JSON.stringify(updatedProduct))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts, getProduct, createProduct, updateProduct
}
