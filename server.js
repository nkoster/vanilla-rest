const http = require('http')

const { 
    getProducts, getProduct, createProduct, updateProduct, deleteProduct
} = require('./controllers/productController')

const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    } else if (req.url.match(/\/api\/products\/([a-z0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if (req.url.match(/\/api\/products\/([a-z0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } else if (req.url.match(/\/api\/products\/([a-z0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json',
            'Owned-By': 'Niels-da-Piels'
        })
        res.end(JSON.stringify({message: `Resource ${req.url} not found`}))
    }
})

const PORT = process.env.PORT || 5000 
server.listen(PORT, _ => console.log(`listing to port ${PORT}`))
