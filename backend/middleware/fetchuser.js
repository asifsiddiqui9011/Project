const jwt = require("jsonwebtoken");



//creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    // console.log(token,"token");
    if (!token){
        res.status(401).send({message:"Please authentication using valid email id and password"})
        console.log("Please authentication using valid email id and password");
    }
    // else {
        try {
            const data = jwt.verify(token.replace("Bearer ", ""),'secret_ecom');
            // console.log(data,"data");
            req.user = data.user;
            next();
        } catch (error) {
            console.log(error.message,"error_invalid");
            res.status(401).send({message:`${error.message}Please Authenticate Using Valid Token`})
        }
    // }
}

module.exports=fetchUser;