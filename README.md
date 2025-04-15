# VandyLostAndFound

We are building a **Lost-And-Found Web Application** to make reporting and finding lost items easier and faster while keeping private information secure.

## **📌 Project Overview**
### **🌟 Purpose**
Our client is the **student body and staff at Vanderbilt University**, who need an efficient way to **manage misplaced items on campus**. Users can:
- **Report lost items** 📢
- **List found items** 🏷️
- **Upload pictures** 🖼️
- **Connect with others** to resolve cases 🔗

### **🛠️ Tech Stack (MERN)**
- **MongoDB** → Database for storing items.
- **Express.js** → Backend framework.
- **React.js** → Frontend user interface.
- **Node.js** → Server environment.
- **Chakra UI** → UI components for a modern look.
- **Zustand** → State management for frontend.

---

## **🚀 How to Run the Project**
### **Project Setup**
1. **Install dependencies**
   ```sh
   npm install
   npm install nodemailer
   npm install multer cloudinary
   ```
2. **Start the development server**
   ```sh
   npm run dev
   ```
3. **Navigate to the frontend folder and start the frontend server**
   ```sh
   cd frontend
   npm run dev
   ```
4. **Visit `http://localhost:5173` in your browser.**

---

## **📌 Project Structure**
```
VandyLostAndFound/
│── backend/
│   ├── controllers/
│   │   ├── item.controller.js
│   │   ├── message.controller.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── models/
│   │   ├── item.model.js
│   │   ├── message.js
│   │   ├── user.js
│   │   ├── user.model.js
│   ├── routes/
│   │   ├── auth.router.js
│   │   ├── item.router.js
│   │   ├── message.router.js
│   │   ├── user.router.js
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinaryConfig.js
│   ├── server.js
│
│── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreatePage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MapPage.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── VerifyEmail.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ItemCard.jsx
│   │   │   ├── ItemDetailModal.jsx
│   │   │   ├── MessageNotification.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   ├── store/
│   │   │   ├── auth.js
│   │   │   ├── userItemStore.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
├── test/
│   ├── backend/
│   │   ├── auth.test.js
│   │   ├── authMiddleware.test.js
│   │   ├── db.test.js
│   │   ├── item.controller.test.js
│   │   ├── sample.test.js
│   │   ├── server.test.js
│   │   ├── user.model.test.js
│   ├── frontend/
│   │   ├── AuthContext.test.jsx
│   │   ├── avatar.test.jsx
│   │   ├── ChatWindow.test.jsx
│   │   ├── checkbox.test.jsx
│   │   ├── close-button.test.jsx
│   │   ├── color-mode.test.jsx
│   │   ├── ConversationList.test.jsx
.......

```

---

## **🚀 Features & Next Steps**

### ✅ Completed Features
- ✅ **MERN Stack Full Integration**
- ✅ **CRUD Operations for Item Management** (Create, Read, Update, Delete items)
- ✅ **Responsive UI built with Chakra UI**
- ✅ **Dark/Light Mode Support**
- ✅ **Secure Vanderbilt Email Authentication** with JWT Login
- ✅ **Email Verification Flow**
- ✅ **Lost/Found Item Reporting**
- ✅ **Interactive Location Map with Marker Placement**
- ✅ **Cloudinary Image Upload for Items** 📸
- ✅ **Search & Filter by Keyword, Category, and Date** 🔍
- ✅ **In-App Secure Messaging and Follow Functionality**
- ✅ **Profile Page Displaying User-Created and Followed Items**
- ✅ **Protected Routes and Session Handling**
- ✅ **Unit and Integration Testing (Jest, React Testing Library, Mocha/Chai)**

### 🔮 Planned / Future Features
- 🔜 **Notification System for Item Matches and Updates**
- 🔜 **Resolved Case History Tracking**
- 🔜 **Admin Moderation Tools for Enhanced Management**
- 🔜 **AI-based Automated Matching Suggestions**
- 🔜 **Real-Time Chat Integration with WebSockets**
- 🔜 **Email Reminders and Notifications**

### 🧑‍💻 Contributors
- Shihan Cheng  
- Tina Memarnishvili  
- Zack Silver  
- Ziwei Guo

📢 **Let’s build a powerful lost-and-found platform together! 💡🚀**


