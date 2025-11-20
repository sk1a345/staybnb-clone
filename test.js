const { MongoClient } = require("mongodb");

// ⚠️ Use your own username + password here, URL-encoded if it has @
const uri = "mongodb+srv://snehakohale2006_db_user:airc134A@airbnbclone.6fb8vfq.mongodb.net/?appName=airbnbClone";

console.log("🔄 Trying to connect...");

MongoClient.connect(uri)
  .then(client => {
    console.log("✅ Connected successfully to MongoDB Atlas!");
    client.close();
  })
  .catch(err => {
    console.error("❌ Connection failed:");
    console.error(err);
  });
