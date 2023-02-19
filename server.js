const express = require("express")
const pkg = require("./package.json")
const port = 8080

const server = express()

server.get("/", (req, res) => {
  return res.status(200).json({
    name : pkg.name,
    author : pkg.author,
    version : pkg.version,
    description : pkg.description,
  })  
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`Example app listening at http://localhost:${port}`)
})