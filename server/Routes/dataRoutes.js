const router = require("express").Router();
const dataHandlerService = require("../Services/dataHandlerService");

router.route("/getAllData")
    .get(dataHandlerService.fetchRecordsFromMongo);
router.route("/getAggregatedData")
    .get(dataHandlerService.fetch_Month_Region_Data);
router.route("/updateRecords")
    .post(dataHandlerService.updateDataToMongo);

module.exports = router;
