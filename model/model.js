const mongoose = require("mongoose");
const { type } = require("os");

const blogModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  dsc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const blog_model = mongoose.model("blog_model", blogModel);

const login_Model = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginModel = mongoose.model("login_data", login_Model);

module.exports = { blog_model, loginModel };
