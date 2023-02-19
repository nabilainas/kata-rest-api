const express = require("express")
const User = require("./User")


const router = express.Router()


router.get("/", (req, res) => {
  res.send({message: "User Route"})
})

router.get("/getall", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/getbyid/:id", async (req, res) => {
  const { id } = req.params
  try {
    const users = await User.findById(id)
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post("/create", async (req, res) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
  })
  try {
    const newUser = await user.save(req.body)
    res.status(201).json({newUser, message: "Utilisateur créé avec succès"})
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" })
  }
})

router.put("/updateuser/:id", async (req, res) => {
  const { id } = req.params
  const body = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,
  }
  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true })
    res.status(200).json({user, message: "Utilisateur modifié avec succès"})
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification de l'utilisateur" })
  }
})

router.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)
    res.status(200).json({user, message: "Utilisateur supprimé avec succès"})
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" })
  }
})

module.exports = router
