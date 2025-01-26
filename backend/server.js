import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Item from './models/item.model.js';
dotenv.config();
const app = express();

app.use(express.json());
app.post("/items", async (req, res) => {
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
    
});

app.delete("/items/:id", async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        console.log(item);
        return res.status(200).json({success: true, message: "Item deleted"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: error.message});
    }
}
);

app.get("/items", async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json({success: true, data: items});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: error.message});
    }
}
);


app.listen(3000, () => {
    connectDB();
    console.log('Server running at http://localhost:3000');
}
);

