const moongose = require("mongoose");

const messageSchema = moongose.Schema({
  message:{
    text:{
      required: true,
      type: String,
    }
  },
  users : {
    type: Array,
    required: true
  },
  sender: {
    type: moongose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

module.exports = moongose.model("Messages", messageSchema);
