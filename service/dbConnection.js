const mongoose = require('mongoose');
const config = require("../config");
// mongoose.connect('mongodb://ds253831.mlab.com:53831/shop', {
//   user: "root",
//   pass: "Root123",
//   useNewUrlParser: true,
//   "authSource": "admin"
// });
mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.database}`, {
  user: config.mongo.user,
  pass: config.mongo.pass,
  // authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("we're connected!");
});
module.exports = db;