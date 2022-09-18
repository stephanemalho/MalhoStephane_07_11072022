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
      //uniqueCaseInsensitive: true,
      //toLowercase: true,
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
    // firstname: { 
    //   type: String,
    //   minlength: 2,
    //   maxlength: 20,
    //   trim: true,      
    // },
    // lastname: {
    //   type: String,
    //   minlength: 2,
    //   maxlength: 20,
    //   trim: true,
    // },
    bio: {
      type: String,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    // birthday: { 
    //   type: Date,
    //   default: Date.now,
    // },
    avatar: {
      type: String,
      default: "../assets/images/default-avatar/avatar.png",
    },
    followers: {
      type: [String],
      ref: "User",
    },
    following: {
      type: [String],
      ref: "User",
    },
    reportsUser: {
      type: Number,
      default: 0,
      ref: "User",
    },
    usersWhoReportedTheUser: {
      type: [String],
      ref: "User",
    },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);




userSchema.plugin(uniqueValidator,{ message: "Éxiste déja." });


module.exports = mongoose.model("User", userSchema);
