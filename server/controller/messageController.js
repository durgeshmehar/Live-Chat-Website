const Message = require("../model/messageModel");

exports.addMessage = async (req, res, next) => {
  try{
    const {from , to , message } = req.body;
    const newMsg = new Message({
      message:{text: message},
      users: [from, to],
      sender: from
    });
    const data =await newMsg.save();
    if(data){
      res.setHeader('Content-Type', 'application/json');
      res.send({msg: "Message sent", status: true});
    }
    else{
      res.json({msg: "Message not sent", status: false});
    }
  }
  catch(err){
    next(err);
  }
}

exports.getMessages = async (req, res, next) => {
  try{
    const {from , to } = req.body;
    const messages = await Message.find({
      users:{
        $all:[from, to]
      }
    }).sort({updatedAt: 1});

    const projectedMsg = messages.map(msg => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      }
    })
    if(messages){
      res.status(200).json(projectedMsg);
    }
    else{
      res.status(404).json({msg: "No messages found"});
    }
  }
  catch(err){
    next(err);
  }
}

