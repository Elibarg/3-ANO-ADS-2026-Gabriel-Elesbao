const jwt = require("jsonwebtoken");

function verificarToken(req,res,next){

    const token=req.cookies?.token;

    if(!token){

        return res.redirect("/login");

    }

    try{

        const usuario=jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        req.usuario=usuario;

        next();

    }

    catch{

        res.clearCookie("token");

        return res.redirect("/login");

    }

}

module.exports=verificarToken;