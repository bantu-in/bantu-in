const fs = require('fs')
let provider = fs.readFileSync("./mock-data/provider-data.json", 'utf8')

console.log(JSON.parse(provider));
