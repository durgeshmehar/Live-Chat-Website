
const router = require('express').Router();
const {registerController, loginController,setavatar ,getAllContacts} = require("../controller/userController");


router.post("/register",registerController)
router.post("/login",loginController)
router.post("/setavatar/:id",setavatar)
router.get("/allcontacts/:id",getAllContacts)

module.exports= router;