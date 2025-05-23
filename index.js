const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// meddleware
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://productsdb:ed5clhcru6jS4DKY@mydul.hr3c9bu.mongodb.net/?retryWrites=true&w=majority&appName=Mydul";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeesCollection = client.db("coffeeDB").collection("coffees");

    app.post("/coffees", async (req, res) => {
      const newCoffee = req.body;
      console.log("new coffees", newCoffee);
      const result = await coffeesCollection.insertOne(newCoffee);
      console.log(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //     await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("This is my personal products");
});
app.listen(port, () => {
  console.log(`this is my port is : ${port}`);
});
