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

module.exports = {
    writeDataToFile, getPostData, response
}
