const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Item = require('../../models/Item');
const Sprint = require('../../models/Sprint');

// @route   POST api/item
// @desc    Create an item
// @access  Private
router.post(
  '/',
    [
      check('title', 'title is required')
        .not()
        .isEmpty(),
      check('description', 'description is required')
        .not()
        .isEmpty()
    ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const sprint = await Sprint.findOne({ }).sort({"week" : -1});

    try {
        const newItem = new Item({
          title: req.body.title,
          description: req.body.description,
          priority: req.body.priority || undefined,
          status: req.body.status || undefined
        });
  
        const item = await newItem.save();
        console.log(item)
        sprint.items.push(item);
        await sprint.save();
  
        res.json(item);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  router.get('/migrate', async (req, res) => {
    try {
      const item = await Item.find({});
      item.forEach(async x => await x.save());
      res.send('migrated')
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      
      // Check for ObjectId format
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !item) {
        console.log('item not found')
        
      }

      await item.remove();
      res.json('item removed');
      console.log('item deleted')
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

router.put('/:id', async (req, res) => {
    const { title, description, end, priority, status } = req.body;

    const newItem = {
      title,
      description,
      end,
      priority,
      status
    };

    try {
      const item = await Item.findOneAndUpdate(
        {_id: req.params.id}, 
        {...newItem}, {new: true});

        console.log(item)
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id });

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;