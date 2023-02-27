const express = require("express")
const mongoose = require("./database")  
const pkg = require("./package.json")
const port = 8080
const userRoutes = require("./user.routes")

const server = express()
server.use(express.json())

mongoose.connection.on("disconnect", e => {
  console.log(e)
})


server.use("/users", userRoutes)

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