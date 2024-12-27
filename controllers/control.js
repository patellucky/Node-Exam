const multer = require("multer");
const fs = require("fs");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = 'your_secret_key';
const { blog_model, loginModel } = require("../model/model");

const addUser = async (req, res) => {
    let hash = await bycrpt.hash(req.body.password, 10);
    try {
        let userData = await loginModel.create({
            username: req.body.userName,
            password: hash,
        });
        // console.log(userData);
        res.redirect("/loginPage");
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        let useFind = await loginModel.findOne({ username: req.body.userName });
        let passcheck = await bycrpt.compare(req.body.password, useFind.password);
        if (passcheck) {
            let payload = {
                id: useFind._id,
                userName: useFind.username
            };
            let token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            console.log("Login Successful");
            res.cookie("token", token).redirect("/");
        } else {
            res.redirect("back");
        }
    } catch (error) {
        console.log(error);
    }
};

const logOut = async (req, res) => {
    try {
        res.clearCookie("username");
        console.log("Log Out Successful...");
        res.redirect("/loginPage");
    } catch (error) {
        console.log(error);
    }
}

const signPage = async (req, res) => {
    try {
        res.render("signPage");
    } catch (error) {
        console.log(error);
    }
};

const imageMulter = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const Upload = multer({ storage: imageMulter }).single("image");

const home = async (req, res) => {
    try {
        const show = await blog_model.find();
        console.log(show);
        res.render("index", { show });
    } catch (error) {
        console.log(error);
    }
};

const formPage = async (req, res) => {
    try {
        await res.render("blog_form");
    } catch (error) {
        console.log(error);
    }
};

const addBlog = async (req, res) => {
    try {
        let image = "";
        if (req.file) {
            image = req.file.path;
            console.log(image);
        }
        const addDataBlog = await blog_model.create({
            title: req.body.title,
            author: req.body.author,
            dsc: req.body.dsc,
            image: image,
        });
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};

const deleteBlog = async (req, res) => {
    let id = req.query.id;
    try {
        let Data = await blog_model.findById(id);
        console.log("delete data" + Data);
        let imgpath = Data.image;
        let deleteData = await blog_model.findByIdAndDelete(id);

        if (imgpath && fs.existsSync(imgpath)) {
            fs.unlinkSync(imgpath);
        }
        res.redirect("back");
        console.log(deleteData);
    } catch (error) {
        console.log(error);
    }
};

const editPage = async (req, res) => {
    try {
        let data = await blog_model.findById(req.query.id);
        await res.render("edit_form", { val: data });
    } catch (error) {
        console.log(error);
    }
};

const update = async (req, res) => {
    try {
        let image = "";
        let id = req.body.id;
        if (req.file) {
            image = req.file.path;
            console.log(image);
        } else {
            image = req.body.old_img;
        }

        console.log("Id: " + id);

        let updateData = await blog_model.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                author: req.body.author,
                date: req.body.date,
                dsc: req.body.dsc,
                image: image,
            },
            { new: true }
        );

        console.log("updated Data::   " + updateData);

        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};

const loginPage = async (req, res) => {
    let userdata = await loginModel.find();
    await res.render("loginPage", { userdata });
};

module.exports = {
    home,
    formPage,
    addBlog,
    Upload,
    deleteBlog,
    editPage,
    update,
    loginPage,
    signPage,
    login,
    addUser,
    logOut
};
