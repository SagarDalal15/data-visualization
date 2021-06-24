const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rawdata = require("./models/rawdata");
const myJSON = require("./jsondata.json");
var MongoClient = require("mongodb").MongoClient;

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

//My code start 2
const url =
  "mongodb+srv://myDB:myDBpassword@data-visualization.rgwvf.mongodb.net/test?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const client1 = mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect((error, myClient) => {
      async function run() {
        const collection = client.db("myDB").collection("rawdata");
        const count = await collection.countDocuments();
        console.log(count);
        if (count < 1000) {
          const res = await collection.insertMany(myJSON);
          console.log("Number of entries to database: " + res.insertedCount);
        }
        client.close();
      }
      run().catch(console.dir);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

//My code ends 2

// mongoose.connect(
//   url,
//   { useNewUrlParser: true },

//   function (err, database) {
//     if (err) throw err;
//     else {
//       console.log("Connected to MongoDB");
//       //Start app only after connection is ready
//       app.listen(4000);
//     }
//   }
// );

// MongoClient.connect(url, async function (err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");

//   var count = await dbo.collection("rawdata").countDocuments();

//   if (count < 1000) {
//     dbo.collection("rawdata").insertMany(myJSON, function (err, res) {
//       if (err) throw err;
//       console.log("Number of document inserted " + res.insertedCount);
//       db.close();
//     });
//   }
// });

mongoose.connection.once("open", () => {
  console.log("Mongodb connection established successfully");
});

app.get(process.env.PORT + "/", (req, res) => {
  //my code start
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect(function (err, db) {
    if (err) throw err;
    var dbo = db.db("myDB");
    dbo
      .collection("rawdata")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
  });
  //my code ends
  // rawdata.find((err, rawData) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.json(rawData);
  //   }
  // });
  // MongoClient.connect(url, function (err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("mydb");
  //   dbo
  //     .collection("rawdata")
  //     .find()
  //     .toArray(function (err, result) {
  //       if (err) throw err;
  //       res.json(result);
  //       db.close();
  //     });
  // });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
