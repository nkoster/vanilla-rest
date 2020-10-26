const Product = require('../models/productModels')
const { getPostData, response } = require('../util')

// GET /api/products
const getProducts = async (_, res) => {
    try {
        const products = await Product.findAll()
        response(res, 200, JSON.stringify(products))
    } catch (err) {
        console.log(err)
    }
}

// GET /api/products/:id
const getProduct = async (_, res, id) => {
    try {
        const product = await Product.findById(id)
        if (!product) {
            response(res, 404, JSON.stringify({message: `Product ${id} not found`}))
        } else {
            response(res, 200, JSON.stringify(product))
        }
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
            response(res, 201, JSON.stringify(newProduct))
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
            response(res, 404, JSON.stringify({message: `Product ${id} not found`}))
        } else {
            const body = await getPostData(req)
            const { title, description, price } = JSON.parse(body)
            // below logic enables updating only relevant field(s)
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            updatedProduct = await Product.update(id, productData)
            response(res, 200, JSON.stringify(updatedProduct))
        }
    } catch (err) {
        console.log(err)
    }
}

// DELETE /api/products/:id
const deleteProduct = async (_, res, id) => {
    try {
        const product = await Product.findById(id)
        if (!product) {
            response(res, 404, JSON.stringify({message: `Product ${id} not found`}))
        } else {
            await Product.remove(id)
            response(res, 200, JSON.stringify({message: `Product ${id} deleted`}))
        }
        res.end(JSON.stringify(product))  
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct
}
