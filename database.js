const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/rest-api"

mongoose.set("strictQuery", true)

mongoose.connect(url)
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(() => console.log("Connexion à MongoDB échouée"))

module.exports = mongoose