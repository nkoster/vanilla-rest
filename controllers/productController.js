const Product = require('../models/productModels')
const { getPostData } = require('../util')

// GET /api/products
const getProducts = async (_, res) => {
    try {
        const products = await Product.findAll()
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Owned-By': 'Niels-da-Piels'
        })
        res.end(JSON.stringify(products))  
    } catch (err) {
        console.log(err)
    }
}

// GET /api/products/:id
const getProduct = async (_, res, id) => {
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
    } catch (err) {
        console.log(err)
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
    } catch (err) {
        console.log(err)
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
            // below logic enables updating e.g. only a single field
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
    } catch (err) {
        console.log(err)
    }
}

// DELETE /api/products/:id
const deleteProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
                'Owned-By': 'Niels-da-Piels'
            })
            res.end(JSON.stringify({message: `Product ${id} not found`}))
        } else {
            await Product.remove(id)
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Owned-By': 'Niels-da-Piels'
            })
            res.end(JSON.stringify({message: `Product ${id} deleted`}))
        }
        res.end(JSON.stringify(product))  
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct
}
