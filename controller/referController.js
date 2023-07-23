const Refer = require('../models/refer');
const User = require('../models/user');


const signInByRefer = async(req, res) => {
    try{
        const {userId} = req;
        const { referCode } = req.body;
        const user = await User.findById(userId);
        const myRefer = await Refer.findOne({user: userId});
        const refer = await Refer.findOne({ referCode: referCode });
        console.log(refer)
        if(referCode){
        if (refer) {
            if (myRefer) {
                return res.status(400).send('You already have a refer code');
            } else {
                refer.myReferernce.push(user);
                refer.save();
                const newRefer = new Refer({
                    user: user,
                    referBy: refer.user
                });
                newRefer.save();
                return res.status(200).send(newRefer);
                
            }
        }
    }else{
        return res.status(400).send('no refer code');
    }
        return res.status(400).send('Refer code not found');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

const createReferCode = async(req, res) => {
    try{
        const {userId} = req;
        const user = await User.findById(userId);
        const refer = await Refer.findOne({user: userId});
        if (refer) {
            return res.status(400).send('You already have a refer code');
        } else {
            const newRefer = new Refer({
                user: user,
                referCode: Math.random().toString(36).substring(7)
            });
            newRefer.save();
            return res.status(200).send(newRefer);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};

const getReferAccount = async(req, res) => {
    try{
        const {referCode} = req.params;
        const refer = await Refer.findOne({referCode: referCode});
        if (refer) {
            // get user data
            const user = await User.findById(refer.user);
            return res.status(200).send(user.wallet);
        } else {
            return res.status(400).send('Refer code not found');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
};


module.exports = {
    signInByRefer,
    createReferCode,
    getReferAccount
};