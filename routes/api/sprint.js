const express = require('express');
var mongoose = require('mongoose');
const router = express.Router();

const Sprint = require('../../models/Sprint');
const Item = require('../../models/Item');

router.post('/', async (req, res) => {
  try {
      const newSprint = new Sprint({});

      const sprint = await newSprint.save();
  
      res.json(sprint);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', async (req, res) => {
  try{
    const sprint = await Sprint.findOne({ }).sort({"week" : -1}).populate('items');
    const items = sprint.items
    res.json(items)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.get('/archive', async (req, res) => {
  try{
    const sprint = await Sprint.findOne({ }).sort({"week" : -1});
    const archive = await Sprint.find({ }).limit(sprint.week - 1).populate('items');
    
    res.json(archive)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

router.post('/:item', async (req, res) => {
  
  let update = {
    returned: true
  }

  try {
      const item = await Item.findOne({ _id: req.params.item });
      const oldItem = await Item.findOneAndUpdate({ _id: req.params.item }, update);
      const existingSprint = await Sprint.findOne({ }).sort({"week" : -1});
      
      item._id = mongoose.Types.ObjectId();
      item.isNew = true;
      await item.save();
      await oldItem.save();
      existingSprint.items.push(item);
      await existingSprint.save();      
      
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// router.post('/:id', async (req, res) => {
//   try {
//     const sprint = await Sprint.findOne({ }).sort({"week" : -1});
//     console.log(sprint);
//     const item = await Item.findOne({ _id: req.params.id });
//     console.log(item)
//     var itemId = item._id;
//     Sprint.find({ items : itemId}, function(res1, result){
//       if(res1){
//         sprint.items.push(itemId);
//         sprint.save(function(err) {
//           if(err){
//             console.log('ERROR at adding bookmark')
//           }
//           else {
//             console.log('bookmark for blog added')
//           }
//         })
//       }
//       else{
//         console.log('Already bookmarked')
//       }
//     });
//   } catch (err){
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// })
    



module.exports = router;