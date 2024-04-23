const signupdata = require("../Models/SingupData");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signupdata.findOne({ email: email, password: password });

    if (!user) {
      console.log(`No user found with username: ${email}`);
      return res.status(400).json({ message: "No user found" });
    }
    else {
      console.log(`User found with username: ${email}`);
      // console.log(user._id)
      res.status(200).json({ message: "User found", userid: user._id });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = login;
