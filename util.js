const fs = require('fs')

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', err => {
        console.log(err)
    })
}

const getPostData = req => {
    return new Promise((yes, no) => {
        try {
            let body = ''
            req.on('data', chunk => {
                body += chunk.toString()
            })
            req.on('end', _ => {
                yes(body)
            })
        } catch (err) {
            no(err)
        }
    })
}

module.exports = {
    writeDataToFile, getPostData
}
