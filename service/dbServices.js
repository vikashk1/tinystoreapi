const db = require("./dbConnection");
const util = require('util')
const Product = require("../model/Product");
const search = async query => {
    query = {
        limit   : query.limit   || 1000,
        skip    : query.skip    || 0,
        q       : query.q       || null,
        order   : query.order   || "desc",
        orderby : query.orderby || "popularity",
    }
    let mQuery = queryParser(query.q);
    console.log(util.inspect(mQuery, false, null, true /* enable colors */))
    let result = await Promise.all([
        Product.find(mQuery)
        .limit(query.limit)
        .skip(query.skip)
        .sort({[query.orderby]:query.order}),
        Product.find(mQuery).countDocuments()
    ]);
    return {
        recordsFiltered : result[1],
        data:result[0]
    };
};
const queryParser = query => {
    let mongoquery = {};
    if(query){
        query = query.replace(/[^a-zA-Z0-9]+/g," ");
        let priceConditions = [];
        let m;
        if ((m = /BELOW\s*?(\d+)/gm.exec(query)) !== null)
            priceConditions.push({ price: { $lt: +m[1] } });
        if ((m = /ABOVE\s*?(\d+)/gm.exec(query)) !== null)
            priceConditions.push({ price: { $gt: +m[1] } });
        query = query.replace(/((ABOVE)|(BELOW))\s*?(\d+)/gm, "");
        let comCond = parseOR(query);
        if(priceConditions.length)
            mongoquery = {
                $and: [
                    comCond,
                    ...priceConditions
                ]
            }
        else
            mongoquery = comCond;
    }
    return mongoquery;
};
function parseAND(q){
    let qo = {};
    if(q){
        q = q.split("AND");
        if(q.length>1){
            qo = {
                $and: q.filter(w=>w.trim())
                    .map(w=>{
                        return {title: new RegExp(w.trim(), "i")}
                    })
            };
        }
        else
            qo = {title: new RegExp(q[0].trim(), "i")};
    }
    return qo;
}
function parseOR(q){
    let qo = {};
    if(q){
        q = q.split("OR");
        if(q.length>1){
            qo = {
                $or: q.filter(w=>w.trim()).map(w=>parseAND(w))
            }
        }
        else
            qo= parseAND(q[0]);
    }
    return qo;
}
// queryParser("Samsung OR apple AND ipad OR NOKIA AND Lumia AND");
module.exports = { search, queryParser };

