import React from "react";
import EnhancedTable from "../components/TopTenPage/TopTenTable";

class TopTenPageClass extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Top Ten!</h1>
        <div
          style={{
            minWidth: 750,
            width: 1200,
            margin: "auto",
          }}
        >
          <EnhancedTable />
        </div>
      </div>
    );
  }
}

export default function TopTenPage() {
  return <TopTenPageClass />;
}
