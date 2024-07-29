require("dotenv").config();
const express =require('express')
const mongoose = require('mongoose');// Middleware// Middleware
const app = express()
const userRoute=require("./routes/userRoutes")
const postRoute=require('./routes/postRoutes')
const commentRoute=require("./routes/commentRoutes")
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

// Define routes 
app.use("/user",userRoute);
app.use("/post",postRoute);
app.use("/comment",commentRoute);

app.get("/",(req,res)=>{
  res.send("done");
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
