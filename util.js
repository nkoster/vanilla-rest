const fs = require('fs')

const writeDataToFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', error => {
        console.log(error)
    })
}

module.exports = {
    writeDataToFile
}
