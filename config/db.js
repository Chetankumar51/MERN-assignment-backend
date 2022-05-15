let mongoose = require("mongoose");
let DB_URL = 'mongodb+srv://chetankumar:chetankumar@cluster0.weesb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(
    DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Db creation succefully");
    } else {
      console.log("Db creation failed");
      
    }
  }
);



