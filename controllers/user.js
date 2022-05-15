let userModels = require("../models/user.js");
let bcrypt = require("bcrypt");

const userRegister = async (req, res, next) => {
  const { fname, lname, email, password } = req.body;

  const emailExist = await userModels.findOne({ email: email });
  try {
    if (emailExist) {
      res.status(409).json({
        error: true,
        message: "Already Exist",
        
        data: null,
      });
    } else {
      //salting
      let saltRound = 10;
      let salt = await bcrypt.genSalt(saltRound);
      // console.log(salt);
      let hashedPassword = await bcrypt.hash(password, salt);
      // console.log(hashedPassword);
      await userModels.insertMany({
        fname,
        lname,
        email,
        password: hashedPassword,
      });
      res.status(200).json({
        error: false,
        message: "Register Successfull",
        data: {
          fname,
          lname,
          email,
          hashedPassword,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

const userLogin = async (req, res, next) => {
  // console.log(req.body);
  const { email, password } = req.body;
  console.log(`Login Email is ${email}`);
  console.log(`Login password is ${password}`);

  try {
    let userData = await userModels.findOne({ email });

    if (userData) {
      const { fname, email, password } = userData;

      let isPasswordValid = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (isPasswordValid) {
        res.status(200).json({
          error: false,
          message: "Login Successfully",

          data: {
            email,
            password,
          },
        });
      } else {
        res.status(403).json({
          error: true,
          message: "Invalid Password",
          data: null,
        });
      }
    } else {
      res.status(401).json({
        error: true,
        message: "Login failed",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
