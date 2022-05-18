import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import Loader from "./Loader";
import axios from "axios";
import Header from "./Header";
import config from "./config.json";
import Notification from "./Notification";


export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, SetError] = useState("");


  const processData = (data) => {
    return new Promise((resolve, reject) => {
      try {
        let East = [];
        let West = [];
        let North = [];
        let South = [];
        data.forEach((item) => {
          let temp = [];
          item.regions.forEach((j) => {
            temp.push(j.region);
            temp.push(j.count);
          });
          if (temp.includes("East")) {
            East.push(temp[temp.indexOf("East") + 1]);
          } else {
            East.push(0);
          }
          if (temp.includes("West")) {
            West.push(temp[temp.indexOf("West") + 1]);
          } else {
            West.push(0);
          }
          if (temp.includes("North")) {
            North.push(temp[temp.indexOf("North") + 1]);
          } else {
            North.push(0);
          }
          if (temp.includes("South")) {
            South.push(temp[temp.indexOf("South") + 1]);
          } else {
            South.push(0);
          }
        });
        let processedData = [
          {
            name: "East",
            data: East,
          },
          {
            name: "West",
            data: West,
          },
          {
            name: "North",
            data: North,
          },
          {
            name: "South",
            data: South,
          },
        ];
        return resolve(processedData);
      } catch (e) {
        console.log(e);
      }
    });
  };

  useEffect(() => {
    async function fetchAPI() {
      let BASE_URL = config.Base_URL;
      let response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getAggregatedData`
      ).then(async(response)=>{
        let result = await processData(response.data.data);
        setChartData(result);
        setIsProcessing(false);
      }).catch(()=>{
        SetError(
          "Unable to reach to backend, PLease try again in some time.."
        );
        setIsProcessing(false);
      });

    }

    fetchAPI();
  }, []);

  return (
    <div>
      {isProcessing ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
           {error && <Notification msg={error} />}
          <Header />
          <Chart data={chartData} />
        </div>
      )}
    </div>
  );
}
