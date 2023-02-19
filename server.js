const express = require("express")
const mongoose = require("./database")  
const User = require("./User")
const pkg = require("./package.json")
const port = 8080

const server = express()


server.use(express.json())

mongoose.connection.on("disconnect", e => {
  console.log(e)
})

server.get("/users", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
server.post("/users", async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
  })
  try {
    const newUser = await user.create(req.body)
    res.status(201).json(newUser, "Utilisateur créé avec succès")
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" })
  }
})

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