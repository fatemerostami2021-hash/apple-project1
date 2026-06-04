require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Article = require("./models/Article");

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const filePath = path.join(__dirname, "articles-content.json");
    const articlesContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
    console.log(`📚 Found ${articlesContent.length} articles to update`);

    let updated = 0;
    let notFound = 0;

    for (const item of articlesContent) {
      const result = await Article.updateOne(
        { slug: item.slug },
        {
          $set: {
            "content.fa": item.content.fa,
            "content.en": item.content.en,
          },
        }
      );

      if (result.matchedCount === 0) {
        console.warn(`⚠️  Not found: ${item.slug}`);
        notFound++;
      } else {
        console.log(`✅ Updated: ${item.slug}`);
        updated++;
      }
    }

    console.log("\n────────────────────────────────");
    console.log(`✅ Updated:   ${updated} articles`);
    console.log(`⚠️  Not found: ${notFound} articles`);
    console.log("────────────────────────────────");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

migrate();