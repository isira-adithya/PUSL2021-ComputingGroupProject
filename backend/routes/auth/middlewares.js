const isLoggedIn = (req, res, next) => {
    if (req.session.isLoggedIn){
        next();
    } else {
        res.status(403);
        return res.json({
            msg: "Forbidden"
        });
    }
}

export {
    isLoggedIn
}