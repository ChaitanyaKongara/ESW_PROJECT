import React, { Component } from "react";
import axios from "axios";
import "./my_readings.css";
import Chart from "react-google-charts";
export default class my_readings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readings: [],
      voc: [],
      temp: [],
      light: [],
      hum: [],
      soil: [],
      time: []
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:4000/Team-27/Node-1/Data")
      .then((res) => {
        var temp = res.data;
        var voc1 = [[ "Time", "VOC" ]];
        var temp1 = [[ "Time", "Temperature" ]];
        var light1 = [[ "Time", "Light" ]];
        var hum1 = [[ "Time", "Humidity" ]];
        var soil1 = [[ "Time", "Soil" ]];
        for (var i = 0; i < temp.length; i++) {
          // this.state.voc.push([i, 2]);
          // console.log(typeof temp[i]["voc"]) ;
          voc1.push([temp[i]["time"], temp[i]["voc"]]);
          temp1.push([temp[i]["time"], temp[i]["temp"]]);
          light1.push([temp[i]["time"], temp[i]["light"]]);
          soil1.push([temp[i]["time"], temp[i]["soil"]]);
          hum1.push([temp[i]["time"], temp[i]["hum"]]);
          // this.state.temp.push(temp[i]["temp"]);
          // this.state.hum.push(temp[i]["hum"]);
          // this.state.soil.push(temp[i]["soil"]);
          // this.state.light.push(temp[i]["light"]);
          // this.state.time.push(temp[i]["time"]);
        };
        this.setState({ readings: res.data})
        this.setState({ voc: voc1});
        this.setState({ temp: temp1});
        this.setState({ soil: soil1});
        this.setState({ hum: hum1});
        this.setState({ light: light1});
      })
      .catch(function (err) {
        console.log(err);
      });
      console.log(this.state.voc);
  }
  render() {
    return (
      <div>
        <h1> Readings </h1>
        <br />
        <br />
        <br />
        <br />
        <div className="table-responsive">
          <table className="table table-lg table-hover">
            <thead>
              <tr className="header">
                <th scope="col">Sno</th>
                <th scope="col">Date</th>
                <th scope="col">Voc</th>
                <th scope="col">Soil Moisture</th>
                <th scope="col">Humidity</th>
                <th scope="col">Temperature</th>
                <th scope="col">Light</th>
              </tr>
            </thead>
            <tbody>
              {this.state.readings.map((obj, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{obj.time}</td>
                  <td>{obj.voc}</td>
                  <td>{obj.soil}</td>
                  <td>{obj.hum}</td>
                  <td>{obj.temp}</td>
                  <td>{obj.light}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="graphs">
          <div>

            <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.state.voc}
              options={{
                hAxis: {
                  title: 'Time',
                },
                vAxis: {
                  title: 'Values',
                },
              }}
            />
            <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.state.light}
              options={{
                hAxis: {
                  title: 'Time',
                },
                vAxis: {
                  title: 'Values',
                },
              }}
            />
            <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.state.hum}
              options={{
                hAxis: {
                  title: 'Time',
                },
                vAxis: {
                  title: 'Values',
                },
              }}
            />
            <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.state.soil}
              options={{
                hAxis: {
                  title: 'Time',
                },
                vAxis: {
                  title: 'Values',
                },
              }}
            />
            <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.state.temp}
              options={{
                hAxis: {
                  title: 'Time',
                },
                vAxis: {
                  title: 'Values',
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
