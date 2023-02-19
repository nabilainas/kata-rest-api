const express = require("express")
const mongoose = require("mongoose")  
const pkg = require("./package.json")
const port = 8080

mongoose.connect("mongodb://localhost:27017/rest-api", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(() => console.log("Connexion à MongoDB échouée"))

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
})
const User = mongoose.model("User", userSchema)


const user = new User({
  firstname: "JohnDoe",
  lastname: "Doe",
  role: "admin",
  email: "johndoe@example.com",
  password: "password123"
})

user.save()
  .then(() => console.log("Utilisateur créé avec succès"))
  .catch(() => console.log("Erreur lors de la création de l'utilisateur"))

const server = express()

server.get("/", (req, res) => {
  return res.status(200).json({
    name : pkg.name,
    author : pkg.author,
    version : pkg.version,
    description : pkg.description,
  })  
})

server.get("/users", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`Example app listening at http://localhost:${port}`)
})