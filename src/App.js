import React from 'react';

import Timeline from "./components/Timeline"
import DateSlider from './components/DateSlider';
import moment from "moment"
import {createOptions, createTimelineData, newGarageData, minDate, maxDate, getAvgDate} from "./Helper";

import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: getAvgDate(minDate, maxDate),
      series: createTimelineData(),
      options: createOptions(),
      air: ["DME", "SVO", "VKO"]
    }
  }


  render() {
    return (
        <div className="App">
          <div className="window">
            <div className="garages">
              {/*Garage for drawing airplanes*/}
              {this.state.air.map((item, index) => {
                return (
                    <div key={index}>
                      <p className="garage-label">{item}</p>
                      <div className="garage inactive"
                           style={{width: newGarageData[item].width, height: newGarageData[item].height}}>
                        {/* eslint-disable-next-line array-callback-return */}
                        {newGarageData[item].blocks.map((obj, index) => {
                          let minTime = moment(obj.dates[0], 'YYYY-MM-DD')
                          let maxTime = moment(obj.dates[1], 'YYYY-MM-DD')
                          let currentTime = moment(this.state.date, '"DD.MM.YYYY"')

                          if (currentTime >= minTime && currentTime <= maxTime)
                            return (
                                <div key={index} className="fly" style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  top: obj.y,
                                  left: obj.x,
                                  backgroundColor: obj.color,
                                  width: obj.w,
                                  height: obj.h
                                }}>
                                  <p style={{
                                    textAlign: "center",
                                    color: "#ffffff",
                                    fontWeight: 500,
                                    fontSize: 16 * obj.h / 73.3
                                  }}>{obj.fly}</p>
                                </div>)
                        })}
                      </div>
                    </div>
                )
              })}
            </div>

            {/*Timeline*/}
            <div className="timeline">
              <Timeline series={this.state.series} options={this.state.options}/>

              {/*Date slider picker*/}
              <div className="data-picker">
                <DateSlider
                    min={minDate}
                    max={maxDate}
                    onChange={(event, value) => {
                      let date = moment(new Date(value)).format("DD.MM.YYYY")
                      this.setState({date})
                    }}
                />
              </div>
            </div>
          </div>
        </div>

    );
  }
}
