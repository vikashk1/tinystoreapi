const mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
    id          : { type: Number, unique: true, index: true },
    title       : { type: String, index: true },
    price       : {type : Number, index:true},
    popularity  : {type : Number, index:true},
    subCategory : {type : String, index:true}
});

// productSchema.index({ title: "text", id: "unique" })
var Product = mongoose.model("Product", productSchema);
module.exports = Product;