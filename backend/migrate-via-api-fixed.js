const mongoose = require('mongoose');

// غیرفعال کردن autoIndex
mongoose.set('autoIndex', false);

const LOCAL_URI = 'mongodb://localhost:27017/apple-db';
const ATLAS_URI = 'mongodb+srv://rostamifatemeh963_db_user:fatemeh2994@cluster0.logyt0s.mongodb.net/apple_store';

async function migrate() {
  const local = await mongoose.createConnection(LOCAL_URI);
  const atlas = await mongoose.createConnection(ATLAS_URI);

  const docs = await local.collection('articles').find({}).toArray();
  console.log('Found', docs.length, 'articles in local');

  // حذف فیلد id از هر سند
  const cleanDocs = docs.map(d => {
    const { id, _id, ...rest } = d;
    return rest;
  });

  // حذف ایندکس id_1 قبل از insert
  try {
    await atlas.collection('articles').dropIndex('id_1');
    console.log('Dropped id_1 index');
  } catch (e) {
    console.log('id_1 index not found');
  }

  await atlas.collection('articles').deleteMany({});
  const result = await atlas.collection('articles').insertMany(cleanDocs);
  console.log('Inserted', result.insertedCount, 'articles');
  process.exit(0);
}

migrate().catch(err => console.error(err));
