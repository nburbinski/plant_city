const mongoose = require("mongoose");
const config = require("../utils/config");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3 },
  name: String,
  passwordHash: { type: String, required: true, minlength: 3 },
  plants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant"
    }
  ],
  date: Date
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
