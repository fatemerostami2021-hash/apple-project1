const mongoose = require('mongoose');
require('dotenv').config();
const Article = require('./models/Article');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.error("✅ Connected to MongoDB");
    const articles = await Article.find({});
    console.error(`📄 Found ${articles.length} articles`);
    console.log(JSON.stringify(articles, null, 2));
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
