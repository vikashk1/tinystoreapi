const request = require('request-promise');
const Product = require("../model/Product");
const db = require("./dbConnection");
const resetData = async ()=>{
    /**
     * 1. Fetch data
     * 2. Preprocess Data
     * 3. Delete oldData
     * 4. InsertNewData
     */
    let data = await request("https://s3.amazonaws.com/open-to-cors/assignment.json").json();
    data = preprocessData(data);
    await Product.deleteMany({});
    await Product.insertMany(data);
};
const preprocessData = (data)=>{
    let list = [];
    data = data.products;
    for(let id in data)
        list.push({
            id:+id,
            title: data[id].title,
            price: +data[id].price,
            popularity: +data[id].popularity,
            subCategory: data[id].subcategory
        });
    data = null;
    return list;
};
// db.once('open', resetData);
module.exports = resetData;