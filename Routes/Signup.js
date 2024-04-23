const signupdata = require("../Models/SingupData");
const signup = async (req, res) => {
  try {
    const { username, email, password, cpassword } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(cpassword);
    if (password !== cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const newUser = new signupdata({ username, email, password, cpassword });
    await newUser.save();
    if (newUser) {
      console.log();
    }

    res.status(200).json({ message: "user added" });
  } catch {
    console.log(error)
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = signup;
