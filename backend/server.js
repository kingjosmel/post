import express from "express";
import { connectDB } from "./config/db.js";
import { createNewPost, getAllPosts } from "./controllers/postController.js";
import cors from "cors";
const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.get("/", getAllPosts);
app.post("/create", createNewPost);

app.listen(3000, () => {
  console.log(`Server running on PORT 3000`);
});
