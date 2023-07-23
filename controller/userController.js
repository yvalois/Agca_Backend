const User = require('../models/user');
const Refer = require('../models/refer');
const cloudinary = require('../config/cloudinary');
const { createToken } = require('../config/jwt');
const {veryfyOwner} = require('../config/owner')


// send signature challenge
const auth = async (req, res) => {
    const { MetaAddress } = req.params;
    console.log(MetaAddress);
    const challenge = req.metaAuth.challenge;
    // save if address not exist save in database
    const userFind = await User.findOne({ wallet: MetaAddress });
    if (!userFind) {
        const user = new User({
            wallet: MetaAddress,
            challenge: challenge
        });
        await user.save();
    } else {
        await User.findOneAndUpdate({ wallet: MetaAddress }, { challenge: challenge });
    }

    return(res.send(challenge));
};

// verify signature
const verify = async(req, res) => {
  
    if(req.metaAuth.recovered) {
        const { MetaMessage, MetaSignature } = req.params;
        const user = await User.findOne({ wallet : req.metaAuth.recovered });
        user.verifyWallet = true;
        user.signature = MetaSignature;
        user.save();

        const token = createToken(user);
        const refer = await Refer.findOne({ user: user._id });
        
        
        if (refer) {
        const referer = await User.findById(refer.referBy);
        if(referer) {
        return(res.status(200).send({ token, user, formValiddated: user.formValiddated, reference : refer, referer: referer.wallet }));
        } else {
        return(res.status(200).send({ token, user, formValiddated: user.formValiddated, reference : refer, referer: null }));
        }
        }else{
        return(res.status(200).send({ token, user, formValiddated: user.formValiddated, reference : null, referer: null }));
        }
    } else {
        return(res.status(401).send('Unauthorized'));
    }
};

//if wallet is verified save user data
const saveData = async(req, res) => {
    try{
    //user id from jwt token
    const address = req.params.address;
   
    const { name, lastName, email, direction, phone, city, country, zipCode, dni } = req.body;
   console.log(name)
   console.log(address)
    // if wallet is verified save user data
    const user = await User.findOne({ wallet: address.toLowerCase() });
    if (user.verifyWallet) {
        console.log('isVerify')
    // upload image to cloudinary
    const DNI = await cloudinary.uploader.upload(dni,{ folder: 'users', width: 500, crop: "scale" });
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.direction = direction;
        user.phone = phone;
        user.city = city;
        user.country = country;
        user.zipCode = zipCode;
        user.dni = DNI.secure_url;
        user.formValiddated = true;
        user.save();

        return res.send({
            user,
            formValiddated: user.formValiddated
        });
    } else {
        return res.send('Wallet is not verified');
    }
    } catch (error) {
        console.log(error);
        res.status(500).send('completa todos los campos');
    }
};

//get user data from jwt token
const getUser = (req, res) => {
    const { userId } = req;
    const user = User.findById(userId);
    return(res.send(user));
};

const buyTokens = async(req, res) => {
    const { userId } = req;
    console.log(userId);
    const { amount } = req.body;
    console.log("amount", amount)
    const user = await User.findById(userId);
    user.tokensBuyed = user.tokensBuyed + parseFloat(amount);
    user.save();
    return(res.send(user));
};

const getAllUsers = async(req, res) => {
    const { userId } = req;
    console.log('owner')
    const user = await User.findById(userId);
    const owner = await veryfyOwner();
    console.log(owner)
    if (owner.toLowerCase() === user.wallet.toLowerCase()) {
        console.log('isOwner')
        const users = await User.find();
        return(res.send({users, isAdmin: true}));
    } else {
        return(res.send({isAdmin: false}));
    }
};



module.exports = {
    auth,
    verify,
    saveData,
    getUser,
    buyTokens,
    getAllUsers
};