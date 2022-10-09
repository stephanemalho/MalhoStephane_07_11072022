const mongoose = require("mongoose"); // import mongoose
const uniqueValidator = require("mongoose-unique-validator");


// mise en structure du schema
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 64,
      uniqueValidator: {
        message: "Email already exists",
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
    },
    pseudo: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
      unique: true,
    },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);




userSchema.plugin(uniqueValidator,{ message: "Éxiste déja." });


module.exports = mongoose.model("User", userSchema);
