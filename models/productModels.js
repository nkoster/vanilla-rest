const products = require('../data/products.json')
const { writeDataToFile, uid } = require('../util')

const findAll = _ => {
    return new Promise(resolve => {
        resolve(products)
    })
}

const findById = id => {
    return new Promise(resolve => {
        resolve(products.find(p => p.id === id))
    })
}

const create = product => {
    return new Promise(resolve => {
        const newProduct = { id: uid(), ...product }
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    })
}

const update = (id, product) => {
    return new Promise(resolve => {
        const index = products.findIndex(p => p.id === id)
        products[index] = { id, ...product }
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    })
}

const remove = id => {
    return new Promise(resolve => {
        writeDataToFile('./data/products.json', products.filter(p => p.id !== id))
        resolve()
    })
}

module.exports = {
    findAll, findById, create, update, remove
}
