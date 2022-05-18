const INSURANCE_SCHEMA = require("../Models/insuranceModel");
const fileOwner = "dataHandlerService.js";

/**
 * Function that fetch records from MongoDB
 * @author   Satvik
 * @param    {}
 * @return   @type {Array<Object>}
 */
exports.fetchRecordsFromMongo = (req, res) => {
  try {
    console.log("Fetching Records from Database", "[fileName:]", fileOwner);
    INSURANCE_SCHEMA.find({}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "Records fetched from MOngo: ",
          result.length,
          "[fileName:]",
          fileOwner
        );
        res.status(200).send({ data: result, Msg: "", RequestStatus: true });
      }
    });
  } catch (e) {
    console.error(
      "Error in Fetching Mongo records Error: " + e,
      "[fileName:]",
      fileOwner
    );
    res.status(500).send({
      Msg: "Error fetching Data, Please try again.",
      Error: e,
      RequestStatus: false,
    });
  }
};

/**
 * Function that update mongo Records based on the _id provided in req.body
 * @author   Satvik
 * @param    {Object} req
 * @return   @type {Array<Object>}
 */
exports.updateDataToMongo = (req, res) => {
  try {
    console.log(
      "Updating Mongo Records with MongoId: " + req.body._id,
      "[fileName:]",
      fileOwner
    );
    INSURANCE_SCHEMA.findByIdAndUpdate(
      req.body.id,
      req.body.updatedObject,
      { new: true },
      function (err, result) {
        if (err) {
          console.log(
            "Mongo Update failed, MongoId: " + req.body._id,
            "[fileName:]",
            fileOwner
          );
        } else {
          console.log(
            "Object with Id: " + result._id + " Updated.",
            "[fileName:]",
            fileOwner
          );
          res.status(200).send({ data: result, Msg: "", RequestStatus: true });
        }
      }
    );
  } catch (e) {
    console.error(
      "Error in Updating Mongo record Error: " + e,
      "[fileName:]",
      fileOwner
    );
    res.status(500).send({
      Msg: "Error updating data, Please try again.",
      Error: e,
      RequestStatus: false,
    });
  }
};

/**
 * Function that fetch Month/Region wise data from MOngoDB
 * @author   Satvik
 * @param    {}
 * @return   @type {Array<Object>}
 */
exports.fetch_Month_Region_Data = async (req, res) => {
  try {
    console.log(
      "Aggregating Data Month/Region wise !!",
      "[fileName:]",
      fileOwner
    );
    let result = await INSURANCE_SCHEMA.aggregate([
      {
        $group: {
          _id: {
            Month: { $month: { $toDate: "$Date of Purchase" } },
            region: "$Customer_Region",
          },
          regionCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.Month",
          regions: {
            $push: {
              region: "$_id.region",
              count: "$regionCount",
            },
          },
          count: { $sum: "$regionCount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).send({ data: result, Msg: "", RequestStatus: true });
  } catch (e) {
    console.error(
      "Error in fetching Data for charts, Error: " + e,
      "[fileName:]",
      fileOwner
    );
    res.status(500).send({
      Msg: "Error fetching data for chats, Please try again.",
      Error: e,
      RequestStatus: false,
    });
  }
};
