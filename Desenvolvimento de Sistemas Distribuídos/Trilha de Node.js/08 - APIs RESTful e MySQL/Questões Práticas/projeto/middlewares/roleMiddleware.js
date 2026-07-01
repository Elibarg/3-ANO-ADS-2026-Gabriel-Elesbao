function permitir(...roles){

    return(req,res,next)=>{

        if(!req.usuario){

            return res.redirect("/login");

        }

        if(!roles.includes(req.usuario.role)){

            return res.status(403).send(

                "Acesso negado."

            );

        }

        next();

    }

}

module.exports=permitir;