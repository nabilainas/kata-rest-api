const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "editor",
  },
  permissions: {
    create: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    }
  }
})

module.exports = mongoose.model("Roles", roleSchema)