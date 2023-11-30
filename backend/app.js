const express = require("express");
const cors = require("cors");
const generalRoutes = require("./routes/generalRoutes");
const searchRoutes = require("./routes/searchRoutes");
const insertRoutes = require("./routes/insertRoutes");
const deleteRoutes = require("./routes/deleteRoutes");
const updateRoutes = require("./routes/updateRoutes");

const port = 3000;
const corAddr = 'http://ec2-3-138-112-51.us-east-2.compute.amazonaws.com';
const app = express();

app.use(express.json());
app.use(cors({ origin: corAddr }));
app.use("/", generalRoutes);
app.use("/", searchRoutes);
app.use("/", insertRoutes);
app.use("/", deleteRoutes);
app.use("/", updateRoutes);

app.listen(port, function(err){
   if (err) console.log(err);
   console.log("Server listening on port", port);
});
