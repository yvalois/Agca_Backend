const ethers = require("ethers");
var ABI = require("../abi/abiERC20.json");

// conection tu blockchain 
var url = process.env.NODE_ENV == 'production'? 'https://bsc-dataseed.binance.org/':'https://data-seed-prebsc-1-s1.binance.org:8545';

var customHttpProvider = new ethers.providers.JsonRpcProvider(url);


var AddressContract = process.env.NODE_ENV == 'production'? '0x8d5209FFa362a9A759437464eD61647Bb9C85Bb2':'0x1396E44eF33bb15970dED3084A4A33E22BE69f48';

const tokenAGCA = new ethers.Contract(AddressContract, ABI, customHttpProvider);


const veryfyOwner = async () => {
    try{
    const owner = await tokenAGCA.owner();
 
    return owner;
    }catch(err){
        console.log(err);
    }
}


module.exports = {veryfyOwner};
