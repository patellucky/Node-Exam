const Router = require("express");
const {
  home,
  formPage,
  addBlog,
  Upload,
  deleteBlog,
  editPage,
  update,
  login,
  signPage,
  addUser,
  logOut,
  loginPage,
} = require("../controllers/control.js");
const isAuth = require("../middleware/middleware.js");

const router = Router();

router.get("/", isAuth ,home);
router.post("/login", login);
router.get("/loginPage",loginPage);
router.post("/sign", addUser);
router.get("/signPage", signPage);
router.get("/logOut",logOut);
router.get("/formPage", formPage);
router.post("/addBlog", Upload, addBlog);
router.get("/delete", deleteBlog);
router.get("/editPage", editPage);
router.post("/editData", Upload, update);

module.exports = router;
