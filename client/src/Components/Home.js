import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import InsuranceTable from "./Table";
import Header from "./Header";

export default function Home() {
  return (
    <div>
      <Header />
      <InsuranceTable></InsuranceTable>
    </div>
  );
}
