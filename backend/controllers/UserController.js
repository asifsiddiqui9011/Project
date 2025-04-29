const Users = require('../models/user.model')
const jwt = require("jsonwebtoken")
const Address = require('../models/address.model.js');
const Order = require('../models/order.model.js')
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// const { google } = require("google-auth-library");
const { OAuth2Client } = require("google-auth-library");

require("dotenv").config();

const SECRET_KEY = "secret_ecom";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const EMAIL = process.env.EMAIL;


// //creating endpoin signup authenticatiobn 
// exports.signup = async(req,res)=>{

//     let check = await Users.findOne({email:req.body.email});
//     if (check) {
//         return res.status(400).json({success:false,
//             errors:'existing user found with same email address'})
//     }
//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//         cart[i]=0;
//     }
//     let wishlist = {};
//     for (let i = 0; i < 300; i++) {
//         wishlist[i]=0;
//     }
//     const user = new Users({
//         name:req.body.username,
//         email:req.body.email,
//         profileImage:req.body.profileImage,
//         password:req.body.password,
//         cartData:cart,
//         wishlistData:wishlist,
//     })

//     await user.save();

//     const data = {
//         user:{
//             id:user.id
//         }
//     }
//     const token = jwt.sign(data,'secret_ecom');
//     res.json({success:true,token})
    

// }


exports.signup = async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            errors: 'Existing user found with the same email address',
        });
    }
    // Initialize cart and wishlist as empty objects
    let cart = {};
    let wishlist = {};

    // Create a new user object with updated cart and wishlist structures
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        profileImage: req.body.profileImage,
        password: req.body.password,
        cartData: cart, // Cart storing product IDs as keys and counts as values
        wishlistData: wishlist, // Wishlist storing product IDs as keys
    });

    await user.save();

    const data = {
        user: {
            id: user.id,
        },
    };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
};

// user login endpoint
exports.login = async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }

            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false,error:"wrong password"});
        }
    }else{
        res.json({success:false,errors:"Wrong Email Id"})
    }
}

//user google login endpoint
exports.googlelogin = async(req,res)=>{

    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const data = {
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,'secret_ecom');
        // console.log(user)
        return res.json({success:true,token});
    }if (!user){
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i]=0;
        }
        let wishlist = {};
        for (let i = 0; i < 300; i++) {
            wishlist[i]=0;
        }
        const newuser = new Users({
            name:req.body.name,
            email:req.body.email,
            profileImage:req.body.profileImage,
            cartData:cart,
            wishlistData:wishlist,
        })
    
        await newuser.save();
    
        const data = {
            user:{
                id:newuser.id
            }
        }
        const token = jwt.sign(data,'secret_ecom');
        res.json({success:true,token})
    }
}

//creating endpoint for gettig user details 
exports.getuserdetails = async (req,res)=>{
    // console.log("Get user data")
    let userData =  await Users.findOne({_id:req.user.id}).populate({path:'address',model:"addresses"}).populate({path:'Order',model:"orders"});
    //console.log(userData)
    res.json(userData);
 }


 const oAuth2Client =new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function createTransporter() {
    const accessToken = await oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken.token,
        }
    });
}
// Request password reset (send token via email)
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = jwt.sign({user:{id:user.id}}, SECRET_KEY, { expiresIn: "7h" });
        const resetLink = `http://localhost:5173/reset-password/${token}`;

        const transporter = await createTransporter();
        await transporter.sendMail({
            from: EMAIL,
            to: email,
            subject: "Password Reset Request - AI Gadgets",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; text-align: center;">
                    <h2 style="color: #2D89EF;">AI Gadgets - Password Reset</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password. If you made this request, please click the button below to reset your password:</p>
                    <a href='${resetLink}' style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #2D89EF; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    <p>If you didn't request this, you can safely ignore this email.</p>
                    <p>For your security, this link will expire in 15 minutes.</p>
                    <hr>
                    <p style="font-size: 12px; color: #888;">AI Gadgets | Your trusted AI-powered gadget store</p>
                </div>
            `
        });

        res.json({ message: "Password reset link sent to email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Reset password with token
exports.resetPassword = async (req, res) => {
    try {

        const { newPassword } = req.body;
        // console.log(newPassword,"newpassword")
        const userId = req.user.id;
        // console.log(userId,"userid")
        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully",success:true });
    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token" });
    }
};

// Update password (Authenticated user)
exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id
        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};




