const User = require("./models/User")
const bcrypt = require("bcrypt")
const salt = 10

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const users = await User.findById(id)
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.createUser = async (req, res) => {
  const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  try {
    const password = await bcrypt.hashSync(req.body.password, salt)
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      role: req.body.role,
      email: req.body.email,
      password: password,
    })
    if (emailFormat.test(user.email)) {
      const newUser = await user.save(req.body)
      res.status(201).json({newUser, message: "Utilisateur créé avec succès"})
    } else {
      res.status(400).json({ message: "e-mail non valide" })
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" })
  }
}

exports.updateUser = async (req, res) => {
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
}
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const cmp = await bcrypt.compareSync(req.body.password, user.password)
      if (cmp) {
        res.status(200).json({ user, message: "Connexion réussie" })
      }else{
        res.status(401).json({ message: "Mot de passe ou e-mail incorrect" })
      }
    } else {
      res.status(401).json({ message: "Mot de passe ou e-mail incorrect" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)
    res.status(200).json({user, message: "Utilisateur supprimé avec succès"})
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" })
  }
}
