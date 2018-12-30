module.exports={
    ensureAuthenticated:(req,res,next)=>{
        if(req.isAuthentticated()){
            return next()
        }
        req.flash('error_msg','Please log in to this page')
        res.redirect('/users/login')
    }
}