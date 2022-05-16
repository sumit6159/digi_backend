const express = require("express");
const router = express.Router();
const Mobile = require('../models/mobile.model')


router.post("/", async (req, res) => {
  try {
  
    const mobile = await Mobile.create(req.body);
    return res.status(200).json(mobile);
  } catch (err) {
    return res.status(400).json(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 10;
    const mobile = await Mobile.find({})
    .populate({ path : 'userId' ,select : ['firstName', "lastName"]})
    .skip((page - 1) * size)
    .limit(size)
    .lean()
    .exec();
    const totalPages = Math.ceil(
      (await Mobile.find().countDocuments()) / size
    );
    return res.status(200).json({Mobile : mobile, totalPages : totalPages});
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
      data = await Mobile.find({}).sort({price : 1}).populate({path : "userId"}).lean().exec();
      return res.status(200).json({Mobile : data});
    } else if(query === 'desc') {
      data = await Mobile.find({}).sort({price : -1}).populate({path : "userId"}).lean().exec();
      return res.status(200).json({Mobile : data});    
    } else if(query === 'yes' || query === 'no') {
      query === 'yes' ? query = true : query = false;
      data = await Mobile.find({verified : query}).populate({path : "userId"}).lean().exec();
      return res.status(200).json({Mobile : data});
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
    const mobile = await Mobile.findByIdAndUpdate(req.params.id, req.body, {new : true}).lean().exec();
    return res.status(200).json(mobile);
  }
  catch(err) {
    return res.status(400).json(err.message)
  }
})
module.exports = router;
