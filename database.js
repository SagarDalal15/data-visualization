const mongoose = require("mongoose");
const connection =
  "mongodb+srv://myDB:myDBpassword@data-visualization.rgwvf.mongodb.net/myDB?retryWrites=true&w=majority";

mongoose
  .connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));
