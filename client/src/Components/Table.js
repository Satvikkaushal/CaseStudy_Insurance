import React, { useState, useEffect, forwardRef } from "react";
import Loader from "./Loader";
import "date-fns";
import Notification from "./Notification";
import { alpha } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import config from "./config.json";

const tableIcons = {
  VisibilityIcon: forwardRef((props, ref) => (
    <VisibilityIcon {...props} ref={ref} />
  )),
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Table() {
  const booleanRenderer = (value) => {
    return value === "0" ? "No" : "Yes";
  };

  const [columns, setColumns] = useState([
    { title: "Policy ID", field: "Policy_id" },
    { title: "Customer Gender", field: "Customer_Gender" },
    { title: "Customer Income group", field: "Customer_Income group" },
    {
      title: "Customer Marital status",
      field: "Customer_Marital_status",
      render: (row) => {
        return booleanRenderer(row["bodily injury liability"]);
      },
    },
    { title: "Customer Region", field: "Customer_Region" },
    { title: "Customer Id", field: "Customer_id" },
    { title: "Date of Purchase", field: "Date of Purchase", editable: "never" },
    { title: "Fuel", field: "Fuel" },
    { title: "Premium", field: "Premium" },
    { title: "VEHICLE SEGMENT", field: "VEHICLE_SEGMENT" },
    {
      title: "Bodily Injury Liability",
      field: "bodily injury liability",
      render: (row) => {
        return booleanRenderer(row["bodily injury liability"]);
      },
    },
    {
      title: "Collision",
      field: "collision",
      render: (row) => {
        return booleanRenderer(row["bodily injury liability"]);
      },
    },
    {
      title: "Comprehensive",
      field: "comprehensive",
      render: (row) => {
        return booleanRenderer(row["bodily injury liability"]);
      },
    },
    {
      title: "Personal Injury Protection",
      field: "personal injury protection",
      render: (row) => {
        return booleanRenderer(row["bodily injury liability"]);
      },
    },
    {
      title: "Property Damage Liability",
      field: "property damage liability",
      render: (row) => {
        return booleanRenderer(row["bodily injury liability"]);
      },
    },
  ]);

  const [updatedObj, setUpdatedObj] = useState({});
  const [insuranceData, setInsuranceData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, SetError] = useState("");
  const [info, SetInfo] = useState("");

  useEffect(() => {
    async function fetchAPI() {
      let BASE_URL = config.Base_URL;
      let response = await axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAllData`)
        .then((response) => {
          setInsuranceData(response.data.data);
          setIsFetching(false);
        })
        .catch(() => {
          setIsFetching(false);
          SetError(
            "Unable to reach to backend, PLease try again in some time.."
          );
        });
    }
    fetchAPI();
  }, [info, error]);

  const style = {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    height: "100vh",
  };

  return (
    <div>
      {isFetching ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          {error && <Notification msg={error} />}
          {info && <Notification msg={info} />}
          <div style={style}>
            <MaterialTable
              title="Policy Holders Table"
              columns={columns}
              icons={tableIcons}
              data={insuranceData}
              components={{}}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    if (newData.Premium > 1000000) {
                      SetError("Premium more than 1 million is allowed");
                      resolve();
                    } else {
                      axios
                        .post(
                          `${process.env.REACT_APP_BASE_URL}/updateRecords`,
                          { id: oldData._id, updatedObject: newData }
                        )
                        .then((res) => {
                          setUpdatedObj(res.data.data);
                          SetInfo("Data updated Succefully");
                        })
                        .then(resolve());
                    }
                  }),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
