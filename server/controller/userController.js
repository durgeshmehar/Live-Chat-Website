const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const alreadyExists = await User.findOne({ username });
    if (alreadyExists) {
      res.send({ msg: "Username already exists", status: false });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.send({ msg: "Email already exists", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    delete user.password;
    res
      .status(201)
      .send({ msg: "User created successfully", status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) {
      const hashingPassword = await bcrypt.compare(
        password,
        userExist.password
      );
      if (hashingPassword) {
        userExist.password = "";
        delete userExist.password;
        res
          .status(200)
          .send({ msg: "Login success", status: true, user: userExist });
      }
      else{

          res
          .send({ msg: "Invalid username or password", status: false });
        }
    }
    else{
      res
      .send({ msg: "Username not exists", status: false });
    }

  } catch (err) {
    next(err);
  }
};

module.exports.setavatar = async (req, res, next) => {
   try{
    const { image } = req.body;
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id ,{
      avatarImage : image,
      isAvatarImageSet : true
    },{new : true});
    res.send({ msg: "Profile picture set successfully", isSet: true, image });
   }
   catch(err){
     next(err);
   }
}


module.exports.getAllContacts = async (req, res, next) => {
  try{
    const id = req.params.id;
    const users = await User.find({_id : {$ne: id} });
    res.send({ msg: "All contacts fetched successfully", users});
  }
  catch(err){
    next(err);
  }



}