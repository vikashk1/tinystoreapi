const service = require("../service/dbServices");
describe("Query Parser", ()=>{
    it("Should return valid mongo query",cb=>{
        let x = service.queryParser("samsung AND galaxy OR apple BELOW 10000");
        cb(!(x.$and[1].price.$lt === 10000));
    })
});