const products = require('../data/products.json')
const { v4: uuid } = require('uuid')
const { writeDataToFile } = require('../util')

const findAll = _ => {
    return new Promise((yes, no) => {
        yes(products)
    })
}

const findById = id => {
    return new Promise((yes, no) => {
        yes(products.find(product => product.id === id))
    })
}

const create = product => {
    return new Promise((yes, no) => {
        const newProduct = { id: uuid(), ...product }
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        yes(newProduct)
    })
}

const update = (id, product) => {
    return new Promise((yes, no) => {
        const index = products.findIndex(p => p.id === id)
        console.log('FOUND', products[index])
        products[index] = { id, ...product }
        writeDataToFile('./data/products.json', products)
        yes(products[index])
    })
}

module.exports = {
    findAll, findById, create, update
}
