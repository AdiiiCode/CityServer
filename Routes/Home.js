const signupdata = require("../Models/SingupData");
const Home=async (req, res) => {
    try {
      const userid = req.params.id;
      console.log(userid)
  
      const find = await signupdata.findById(userid);
  
      if (!find) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.json(find);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  module.exports=Home