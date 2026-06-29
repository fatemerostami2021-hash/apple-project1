import mongoose from "mongoose";
import fs from "fs";

const LOCAL_URI = "mongodb://localhost:27017/apple-db";

async function exportData() {
  try {
    await mongoose.connect(LOCAL_URI);
    console.log("✅ Connected to local database");

    const collections = ["articles", "products", "slides", "users"];
    for (const col of collections) {
      const data = await mongoose.connection.db.collection(col).find({}).toArray();
      fs.writeFileSync(`${col}.json`, JSON.stringify(data, null, 2));
      console.log(`✅ ${col}.json exported (${data.length} documents)`);
    }

    await mongoose.disconnect();
    console.log("🎉 Export completed!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

exportData();
