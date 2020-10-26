const products = require('../data/products.json')
const { v4: uuid } = require('uuid')
const { writeDataToFile } = require('../util')

const findAll = _ => {
    return new Promise(always => {
        always(products)
    })
}

const findById = id => {
    return new Promise(always => {
        always(products.find(p => p.id === id))
    })
}

const create = product => {
    return new Promise(always => {
        const newProduct = { id: uuid(), ...product }
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        always(newProduct)
    })
}

const update = (id, product) => {
    return new Promise(always => {
        const index = products.findIndex(p => p.id === id)
        products[index] = { id, ...product }
        writeDataToFile('./data/products.json', products)
        always(products[index])
    })
}

const remove = id => {
    return new Promise(always => {
        writeDataToFile('./data/products.json', products.filter(p => p.id !== id))
        always(products)
    })
}

module.exports = {
    findAll, findById, create, update, remove
}
