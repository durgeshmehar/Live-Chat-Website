
const router = require('express').Router();
const {addMessage,getMessages} = require("../controller/messageController")

router.post("/add",addMessage)
router.post("/getAll",getMessages)

module.exports= router;