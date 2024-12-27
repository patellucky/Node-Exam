const isAuth = (req,res,next) => {
    let token = req.cookies.token;
    if(token){
        next();
    } else {
        res.redirect("/loginPage")
    }
}

module.exports = isAuth;