const express = require('express');
const shopModel = require('../Models/shop_model');
const jwt = require('jsonwebtoken')
const User = require('../Models/mech_model');
const ShopModel = require('../Models/shop_model');
shopRoutes = express.Router();

shopRoutes.post('/shop/register', async (req,res)=>{
   try{
    const {location,pincode,shopName,ownerName,phoneNumber,shopToken} = req.body;
    const existingShop = await shopModel.findOne({shopToken});

    if (existingShop) {
        return res.status(400).json({ msg: "Your are already exist shop owner!" });
      }

    let shop = new shopModel({
        location,
        pincode,
        shopName,
        ownerName,
        phoneNumber,
        shopToken,
    });

    const verified = jwt.verify(shopToken,"PasswordKey");
    if(!verified){
        return res.status(400).json({msg : "Error In Verified"})
      }
   let user = await User.findById(verified.id);
    if (!user) {
        return res.status(400).json({ msg: `${verified.id}`});
    }

    user.isShop = true;
     await user.save();

    shop = await shop.save();
    res.json({...shop._doc});
   }catch(e){
    res.status(500).json({ error: e.message });
   }
});


shopRoutes.post('/shop/get', async (req, res) => {
    const { shopToken } = req.body;

    try {
        const ShopDetails = await ShopModel.findOne({ shopToken });

        if (!ShopDetails) {
            return res.status(400).json({ msg: "Shop Details don't exist!" });
        }

        res.json({ ...ShopDetails._doc });
    } catch (e) {
        console.error('Error fetching shop details: ', e.message);
        res.status(500).json({ error: e.message });
    }
});

module.exports = shopRoutes;