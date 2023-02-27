const express = require("express")
const userController = require("./controllers/user.controller")
const router = express.Router()

router.get("/", (req, res) => {
  res.send({message: "User Route"})
})

// Get user(s)
router.get("/getall", userController.getAllUsers)
router.get("/:id", userController.getUserById)

// Create user
router.post("/create", userController.createUser)
router.post("/login", userController.loginUser)

// Update user
router.put("/:id", userController.updateUser)

//delete user
router.delete("/:id", userController.deleteUser)


module.exports = router
