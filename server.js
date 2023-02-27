const express = require("express")
const mongoose = require("./database")  
const pkg = require("./package.json")
const port = 8080
const Role = require("./models/Role")
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

server.post("/createrole", (req, res) => {
  const { name, permissions } = req.body
  try {
    const role = new Role({
      name: name,
      permissions: {
        userPermission: permissions.userPermission,
        pagePermission: permissions.pagePermission,
        navigationMenuPermission: permissions.navigationMenuPermission,
        formPermission: permissions.formPermission,
      },
    })
    const newRole = role.save()
    res.status(201).json({newRole, message: "Role créé avec succès"})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`Example app listening at http://localhost:${port}`)
})