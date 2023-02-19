const express = require("express")
const port = 8080



const server = express()

server.get("/", (req, res) => {
  res.send("Hello World!")
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`Example app listening at http://localhost:${port}`)
})