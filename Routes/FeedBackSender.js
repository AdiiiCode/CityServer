const { sendFeedBack } = require("./SendFeedBack");


const SenderFeedback = async (req,res)=>
{
    const {Username, Useremail,UserFeedback}=req.body;
  try {
await sendFeedBack(Username,Useremail,UserFeedback);
console.log("FeedBack Sended")
  } catch (error) {
    console.log(error)
  }
}

module.exports = SenderFeedback;