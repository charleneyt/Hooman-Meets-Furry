import React from "react";
import EnhancedTable from "../components/TopTenPage/TopTenTable";

class TopTenPageClass extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Top Ten!</h1>
        <div>
          <EnhancedTable />
        </div>
      </div>
    );
  }
}

export default function TopTenPage() {
  return <TopTenPageClass />;
}
