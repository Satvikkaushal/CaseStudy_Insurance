const INSURANCE_SCHEMA = require("../Models/insuranceModel");
const fs = require("fs");
const { parse } = require("csv-parse");
const fileOwner = "csvToDbService.js";


/**
* Function that converts CSV data to array of Objects
* @author   Satvik
* @param    {}    
* @return   @type {Array<Object>}       
*/
exports.csvToJson = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const parser = parse({ columns: true }, function (err, records) {
        console.log("Parsing CSV file..", "[fileName:]", fileOwner);
        console.log(
          "Number of Records to be inserted in MongoDB:",
          records.length,
          "[fileName:]",
          fileOwner
        );
        resolve(records);
      });

      let projectDirectory = await this.fetchDirectory("DataSets");

      fs.createReadStream(
        `${projectDirectory}${process.env.CSV_FILE_NAME}`
      ).pipe(parser);
    } catch (e) {
      console.log("Error:", e);
      reject(e);
    }
  });
};


/**
* Function that Loads CSV data to MongoDb records
* @author   Satvik
* @param    {Array<Object>} JsonData
* @return   {}      
*/
exports.loadDataToDb = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let JsonData = await this.csvToJson();
      INSURANCE_SCHEMA.insertMany(JsonData)
        .then(function () {
          console.log(
            "Data inserted into MongoDb:",
            JsonData.length,
            "[fileName:]",
            fileOwner
          );
        })
        .catch(function (error) {
          console.log(
            "Failed to load Data Into MongoDB",
            error,
            "[fileName:]",
            fileOwner
          );
        });
    } catch (e) {
      console.log("Error:", e);
      reject(e);
    }
  });
};


/**
* Function that returns the path the provided FolderName
* @author   Satvik
* @param    {String} folderName
* @return   {}      
*/
exports.fetchDirectory = (folderName) => {
  return new Promise((resolve, reject) => {
    try {
      let projectDir = __dirname;
      if (projectDir.includes("/")) {
        let the_arr = projectDir.split("/");
        the_arr.pop();
        projectDir = the_arr.join("/");
        projectDir += `/${folderName}/`;
      } else {
        let the_arr = projectDir.split("\\");
        the_arr.pop();
        projectDir = the_arr.join("\\");
        projectDir += `\\${folderName}\\`;
      }
      return resolve(projectDir);
    } catch (e) {
      reject(e);
    }
  });
};
