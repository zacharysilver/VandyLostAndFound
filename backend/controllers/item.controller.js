import Item from "../models/item.model.js";

// ✅ Create Item (Supports Image Upload)
export const createItem = async (req, res) => {
<<<<<<< Updated upstream
    try {
        const { name, description, dateFound } = req.body;
        if (!name || !dateFound || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const image = req.file ? `http://localhost:3000/uploads/${req.file.filename}` : "";


        const newItem = new Item({ name, description, dateFound: new Date(dateFound), image });

        await newItem.save();
        return res.status(201).json({ success: true, data: newItem });

    } catch (error) {
        console.error("❌ Error creating item:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
=======
  try {
    const { name, description, dateFound, category, itemType, location } = req.body;
    
    if (!name || !dateFound || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Parse location if it's a string (from FormData)
    let locationData = location;
    if (location && typeof location === 'string') {
      try {
        locationData = JSON.parse(location);
      } catch (error) {
        console.error("Error parsing location data:", error);
      }
    }

    // Cloudinary sets req.file.path to the public URL of the uploaded image
    const imageUrl = req.file ? req.file.path : "";

    const newItem = new Item({
      name,
      description,
      dateFound: new Date(dateFound),
      image: imageUrl,
      category: category || 'Other',
      itemType: itemType || 'found',
      location: locationData,
      user: req.user ? req.user.id : null
    });

    await newItem.save();
    return res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error("❌ Error creating item:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
>>>>>>> Stashed changes
};

// ✅ Delete Item
export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (item) {
            return res.status(200).json({ success: true, message: "Item deleted successfully" });
        } else {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
    } catch (error) {
        console.error("❌ Error deleting item:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Item
export const updateItem = async (req, res) => {
<<<<<<< Updated upstream
    try {
        if (req.body.dateFound) {
            req.body.dateFound = new Date(req.body.dateFound);
        }

        // If a new image is uploaded, update image URL
        if (req.file) {
            req.body.image = `/uploads/${req.file.filename}`;
        }
=======
  try {
    // Handle date formatting
    if (req.body.dateFound) {
      req.body.dateFound = new Date(req.body.dateFound);
    }

    // Parse location if it's a string
    if (req.body.location && typeof req.body.location === 'string') {
      try {
        req.body.location = JSON.parse(req.body.location);
      } catch (error) {
        console.error("Error parsing location data:", error);
      }
    }

    // If a new image is uploaded to Cloudinary, set req.body.image to req.file.path
    if (req.file) {
      req.body.image = req.file.path;
    }
>>>>>>> Stashed changes

        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (updatedItem) {
            return res.status(200).json({ success: true, message: "Item updated successfully", data: updatedItem });
        } else {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
    } catch (error) {
        console.error("❌ Error updating item:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Fetch All Items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json({ success: true, data: items });
    } catch (error) {
        console.error("❌ Error fetching items:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get items for map view (simplified for map markers)
export const getItemsForMap = async (req, res) => {
  try {
    // Only get items with location coordinates
    const items = await Item.find({
      'location.coordinates': { $exists: true }
    })
    .select('name description image itemType location status');
    
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("❌ Error fetching map items:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    console.error("❌ Error fetching item:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};