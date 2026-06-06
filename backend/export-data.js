const mongoose = require('mongoose');
require('dotenv').config();

const articleSchema = new mongoose.Schema({
  slug: String,
  brand: String,
  publishDate: String,
  readTime: Number,
  likes: Number,
  author: String,
  tags: [String],
  title: {
    fa: String,
    en: String
  },
  content: {
    fa: String,
    en: String
  }
}, { collection: 'articles' });

const Article = mongoose.model('Article', articleSchema);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.error('✅ Connected to MongoDB');
    const articles = await Article.find({}).lean();
    console.error('📄 Found ' + articles.length + ' articles');
    console.log(JSON.stringify(articles, null, 2));
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
