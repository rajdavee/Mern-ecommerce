const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; // Ensure this is set correctly
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
  console.log('Connected to MongoDB');
});
