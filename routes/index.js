const router = require("express").Router();
const service = require("../service/dbServices");
const importData = require("../service/import");
router.get("/list",async (req,res, next)=>{
    let query = req.parts.query;
    if(query.limit)   query.limit   = +query.limit;
    if(query.skip)    query.skip    = +query.skip;
    if(query.draw)    query.draw    = +query.draw;
    console.log(query);
    try{
        let data = await service.search(query);
        data.draw = query.draw;
        data.recordsTotal = data.recordsFiltered;
        res.send(data);
    } catch (ex){
        console.error(ex);
        next(ex);
    }
});
router.get("/resetData",async (req,res,next)=>{
    await importData();
    res.send({status:"Data imported"});
});
module.exports = router;
