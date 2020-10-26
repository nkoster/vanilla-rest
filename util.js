const fs = require('fs')

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', err => {
        console.log(err)
    })
}

const getPostData = req => {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('data', chunk => {
                body += chunk.toString()
            })
            req.on('end', _ => {
                resolve(body)
            })
        } catch (err) {
            reject(err)
        }
    })
}

const response = (res, status, payload) => {
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(payload)    
}

// Below is not optimal, careful.
const uid = _ => {
    return (Math.random() * Date.now()).toString(16).substr(0, 8) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 4) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 4) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 4) + '-' +
    (Math.random() * Date.now()).toString(16).substr(0, 6) +
    (Math.random() * Date.now()).toString(16).substr(0, 6)
}

module.exports = {
    writeDataToFile, getPostData, response, uid
}
