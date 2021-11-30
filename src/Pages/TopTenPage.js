import React from "react";
import EnhancedTable from "../components/TopTenPage/TopTenTable";
import SelectLabels from "../components/TopTenPage/TopTenSelectBar";

class TopTenPageClass extends React.Component {
  render() {
    return (
      <div>
        <SelectLabels />
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Top Ten!</h1>
          <div
            style={{
              minWidth: 750,
              width: "80%",
              margin: "auto",
            }}
          >
            <EnhancedTable />
          </div>
        </div>
      </div>
    );
  }
}

export default function TopTenPage() {
  return <TopTenPageClass />;
}
