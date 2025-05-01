import express from "express";
import cors from "cors"; //Enables Cross-Origin Resource Sharing (CORS) in your Node.js application
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

import errorHandling from "./middleware/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(cors());

// Error handling middleware
app.use(errorHandling);

//Create table before starting server
createUserTable();

//test postgres
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");

  res.send(`the db name is :${result.rows[0].current_database}`);
});

// Routes
app.use("/api", userRoutes);

// Server running
app.listen(port, () => {
  console.log(`Server is running on http:localhost:${port}`);
});
