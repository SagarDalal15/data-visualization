import React from "react";
import { getRawData } from "./api";
import { NavigationBar, MyTable } from "./Components";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      JSONdata: [],
    };
  }

  //Get Data from DB
  getData = async () => {
    const RawData = await getRawData();
    var i;
    var arr = [];
    RawData.map((e) => {
      arr.push(e);
    });

    this.setState({ JSONdata: arr });
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="app">
        <div className="app_navigation-bar">
          <NavigationBar />
        </div>
        <div className="app_Table-wrapper">
          <div className="app_Table">
            <MyTable data={this.state.JSONdata} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
