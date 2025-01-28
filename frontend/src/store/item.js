import {create} from 'zustand';
import { createItem, updateItem } from '../../../backend/controllers/item.controller';

export const useItemStore = create((set) => ({
        items: [],
        setItems: (items) => set({ items }),
        createItem: async (newItem) => {
            if(!newItem.name || !newItem.description || !newItem.dateFound) {
                return { success: false, message: "Please fill in all fields." };
            }
            const res = await fetch("http://localhost:3000/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });
            const data = await res.json();
            set((state) => ({ items: [...state.items, data.data] }));
            return { success: data.success, message: data.message};
        },
        deleteItem: async (id) => {
            const res = await fetch(`http://localhost:3000/items/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if(data.success) {
                set((state) => ({ items: state.items.filter((item) => item._id !== id) }));
            }
            return data;
        },
        fetchItems: async () => {
            const res = await fetch("http://localhost:3000/items");
            const data = await res.json();
            if(data.success){
                set({ items: data.data });
            }
            return data;
        },
        updateItem: async (id, updatedItem) => {
            const res = await fetch(`http://localhost:3000/items/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedItem),
            });
            const data = await res.json();
            if(data.success) {
                set((state) => ({ items: state.items.map((item) => item._id === id ? data.data : item) }));
            }
            return data;
        }
}));
