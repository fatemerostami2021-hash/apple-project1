import mongoose from "mongoose";
const LOCAL_URI = "mongodb://localhost:27017/apple-db";
const API_BASE = "https://backend-delta-rust-17.vercel.app";
const ADMIN_TOKEN = "fatemeh963";
const COLLECTIONS = ["products", "articles", "slides", "users", "siteabouts", "comments"];
async function run() {
  const conn = await mongoose.createConnection(LOCAL_URI).asPromise();
  console.log("Connected to local DB");
  for (const name of COLLECTIONS) {
    const docs = await conn.collection(name).find({}).toArray();
    if (docs.length === 0) { console.log("SKIP " + name); continue; }
    const cleanDocs = docs.map(d => {
      const obj = { ...d, _id: d._id.toString() };
      delete obj.id;
      return obj;
    });
    const res = await fetch(API_BASE + "/api/admin/import/" + name, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-migrate-token": ADMIN_TOKEN },
      body: JSON.stringify({ docs: cleanDocs }),
    });
    const json = await res.json();
    console.log(name + ":", JSON.stringify(json));
  }
  await conn.close();
  console.log("DONE");
  process.exit(0);
}
run().catch(err => { console.error("ERROR:", err.message); process.exit(1); });
