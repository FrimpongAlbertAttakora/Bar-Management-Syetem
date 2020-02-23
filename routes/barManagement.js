const express = require('express');
const router = express.Router();
const Item = require('../model/Item');


//GET BACK ALL THE ITEM
router.get('/', async (req, res) => {
    try{
        const items = await Item.find();
            res.json(items);
    }   catch(err){
            res.json({message: err});
    }
});

//GET BACK ALL THE STOCK And SALE TOTALS
router.get('/stock_sale_Totals', async (req, res) => {
    try{
        const items = await Item.aggregate([{
             $project: {
                drink_sale_total: {$sum: "$drink_sale"},
                drink_stock_total: {$sum: "$drink_stock"},
            }
        }]) 
        res.json(items);
    }   catch(err){
            res.json({message: err});
    }
});


//ADD AN ITEM
router.post('/', async (req, res) => {
    const item = new Item({
        drink_type: req.body.drink_type,
        drink_stock: req.body.drink_stock,
        drink_price: req.body.drink_price,
        drink_sale: req.body.drink_sale,
    });
    try{
    const savedItem = await item.save();
    res.json(savedItem);
    }catch(err){
        res.json({message: err});
    }
});


//UPDATE ITEMS
router.patch('/:ItemId', async (req, res) => {
    try{
    const updatedItem = await Item.updateOne({ _id: req.params.ItemId }, 
        {
            $push: { 
                drink_stock: req.body.drink_stock,
                drink_sale: req.body.drink_sale,
                    }
        });
        res.json(updatedItem);
            }catch (err) {
                res.json({ message: err });
    }
});


//SET ITEM PRICE
router.patch('/price/:ItemId', async (req, res) => {
    try{
    const updatedItem = await Item.updateOne({ _id: req.params.ItemId }, 
        {
            $set: { 
                drink_price: req.body.drink_price,
                }
        });
        res.json(updatedItem);
            }catch (err) {
                res.json({ message: err });
    }
});

//Delete Post
router.delete('/:ItemId', async (req, res) => {
    try{
        const removedItem = await Item.deleteOne({ _id: req.params.ItemId });
        res.json(removedItem);
    }catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
