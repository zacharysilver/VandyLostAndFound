import Item from "../models/item.model.js";

export const createItem = async (req, res) => {
    const item = req.body;
    if(!item.name||!item.dateFound||!item.description){
        return res.status(400).json({success: false, message: "All fields are required"});
    } 
    item.dateFound = new Date(item.dateFound);
    const newItem = new Item(item);

    try {
        await newItem.save();
        return res.status(201).json({success: true, data: newItem});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: error.message});
    }
    
};

export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        console.log(item);
        if(item){
            return res.status(200).json({success: true, message: "Item deleted"});
        }
        else {
            return res.status(404).json({success: false, message: "Item not found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: error.message});
    }
};

export const updateItem = async (req, res) => {
    try {
        if(req.body.dateFound){
            req.body.dateFound = new Date(req.body.dateFound);
        }
        const item = await Item.findByIdAndUpdate(req.params.id, req.body);
        if(item){
            return res.status(200).json({success: true, message: "Item updated"});
        }
        else {
            return res.status(404).json({success: false, message: "Item not found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: error.message});
    }
};

export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json({success: true, data: items});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: error.message});
    }
};
