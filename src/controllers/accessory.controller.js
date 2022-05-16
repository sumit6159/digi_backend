const express = require("express");
const router = express.Router();
const Accessory = require('../models/accessory.model')


router.post("/", async (req, res) => {
  try {
  
    const accessory = await Accessory.create(req.body);
    return res.status(200).json(accessory);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 10;
    const accessory = await Accessory.find({})
    .populate({ path : 'userId' ,select : ['firstName', "lastName"]})
    .skip((page - 1) * size)
    .limit(size)
    .lean()
    .exec();
    const totalPages = Math.ceil(
      (await Accessory.find().countDocuments()) / size
    );
    return res.status(200).json({Accessory : accessory, totalPages : totalPages});
  }
  catch(err) {
    return res.status(400).json(err.message);
  }
})

router.get('/sort', async(req, res)=>{
  try {
    let query = req.query.sortby;
    let data;
    if(query === 'asc'){
      data = await Accessory.find({}).sort({price : 1}).populate({path : "userId"}).lean().exec();
      return res.status(200).json({Accessory : data});
    } else if(query === 'desc') {
      data = await Accessory.find({}).sort({price : -1}).populate({path : "userId"}).lean().exec();
      return res.status(200).json({Accessory : data});    
    } else if(query === 'yes' || query === 'no') {
      query === 'yes' ? query = true : query = false;
      data = await Accessory.find({verified : query}).populate({path : "userId"}).lean().exec();
      return res.status(200).json({Accessory : data});
    } else {
      return res.status(400).json({message : "sortby should be 'asc' / 'desc' or 'yes' / 'no'"})
    }
  }
  catch(err) {
    return res.status(400).json(err.message);
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const accessory = await Accessory.findByIdAndUpdate(req.params.id, req.body, {new : true}).lean().exec();
    return res.status(200).json(accessory);
  }
  catch(err) {
    return res.status(400).json(err.message)
  }
})
module.exports = router;
