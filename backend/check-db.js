const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Article = mongoose.model('Article', new mongoose.Schema({}, { strict: false, collection: 'articles' }));
  const articles = await Article.find({}, { slug: 1, title: 1 });
  
  console.log('📚 Articles in database:');
  console.log('Total:', articles.length);
  console.log('-------------------');
  
  articles.forEach((a, i) => {
    console.log((i+1) + '. slug: "' + a.slug + '"');
    console.log('   title: ' + (a.title?.fa || a.title?.en || 'no title'));
  });
  
  process.exit();
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
