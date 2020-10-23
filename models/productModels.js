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

module.exports = {
    findAll, findById, create
}
