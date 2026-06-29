import mongoose from "mongoose";
import fs from "fs";

const ATLAS_URI = "mongodb+srv://rostamifatemeh963_db_user:fatemeh2994@cluster0.logyt0s.mongodb.net/apple_store";

async function importData() {
  try {
    await mongoose.connect(ATLAS_URI);
    console.log("✅ Connected to Atlas");

    const collections = ["articles", "products", "slides", "users"];
    for (const col of collections) {
      const filePath = `${col}.json`;
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️ ${filePath} not found, skipping`);
        continue;
      }

      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (data.length === 0) {
        console.log(`⏭️ ${col} is empty, skipping`);
        continue;
      }

      const collection = mongoose.connection.db.collection(col);
      await collection.deleteMany({});
      const result = await collection.insertMany(data);
      console.log(`✅ ${col}: ${result.insertedCount} documents imported`);
    }

    await mongoose.disconnect();
    console.log("🎉 Import completed!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

importData();
