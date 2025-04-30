const { Client } = require("pg");

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "Swap@123", // Make sure this matches the actual password in pgAdmin
  database: "mydb", // Ensure this database exists
});

con
  .connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
    return con.query("SELECT NOW()");
  })
  .then((res) => {
    console.log("🕒 Server time:", res.rows[0].now);
    return con.end(); // Always close the connection
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err.message);
  });
