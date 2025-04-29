const Address = require('../models/address.model.js')
const Users = require('../models/user.model.js')


//api for adding address
exports.addaddress = async (req, res)=>{
    let addresses = await Address.find({});
    let id;
    if(addresses.length>0)
    { 
        let last_address_array = addresses.slice(-1);
        let last_address = last_address_array[0];
        id = last_address.id+1;
    }
    else{
       id=1;  

    }
    const userID = req.user.id
    // console.log(userID,"addressusefriddd")
    const address = new Address({
        houseNo:req.body.houseNo,
        locality:req.body.locality,
        city:req.body.city,
        state:req.body.state,
        zipCode:req.body.zipcode,
        category:req.body.category,
        mobile:req.body.mobileno,
        user:userID,
    });
    
    // console.log(address);
    await address.save();
    let objId =address.id;
    // console.log(`${objId}`,userID)
    const use = await Users.findByIdAndUpdate(userID,{$push:{address:[objId]}});
    // console.log(use)
    // console.log("saved");
    res.json({
        success:true,
        category:req.body.category,
    })
}


//get address
exports.getAddresses = async (req,res)=>{
    let addresses = await Address.find({}).populate("Users");
    // console.log("all products fetched");
    res.send(addresses);
}
