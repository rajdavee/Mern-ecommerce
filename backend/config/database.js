const { MongoClient, ServerApiVersion } = require('mongodb');

// Your MongoDB connection URI
const uri=process.envDB_URI;

// Create a MongoClient with options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}

// Execute the function
run().catch(console.dir);
