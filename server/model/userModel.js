const moongose = require("mongoose");

const userSchema = moongose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = moongose.model("Users", userSchema);
