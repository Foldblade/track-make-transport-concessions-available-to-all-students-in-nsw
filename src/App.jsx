import React, { useState, useEffect } from "react";
import "./App.css";
import "@material/web/button/filled-button.js";
import { Line } from "@ant-design/plots";
import { Liquid } from "@ant-design/plots";
import rawData from "./data.json5";
import { QRCodeSVG } from "qrcode.react";
import { format } from "fecha";

function App() {
  const [data, setData] = useState([]);
  const [percent, setPercent] = useState(0.0);

  useEffect(() => {
    let newData = [];
    let percent = 0;
    for (let i = 0; i < rawData.length; i++) {
      let time = new Date(rawData[i].time);
      newData.push({
        Time: time,
        Signatories: parseInt(rawData[i].cnt),
        Aim: 20000,
      });
    }
    percent = newData[newData.length - 1].Signatories / 20000;
    setData(newData);
    setPercent(percent);
  }, []);

  const config = {
    data,
    xField: "Time",
    yField: "Signatories",
    axis: {
      y: {
        labelAutoHide: true,
        labelAutoRotate: true,
        title: false,
      },
    },
    label: {
      text: (datum) => `${datum.Signatories}`,
      dx: -20,
      dy: -20,
      textAnchor: "middle",
      selector: "last",
    },
    // children: [
    //   {
    //     type: "line",
    //     yField: "Signatories",
    //     shapeField: "smooth",
    //     style: {
    //       stroke: "#5AD8A6",
    //       lineWidth: 4,
    //       opacity: 0.5,
    //     },
    //     label: {
    //       text: (datum) => `${datum.Signatories}`,
    //       position: "left-top",
    //       selector: (data) => {
    //         if (data.length) {
    //           return data.filter((d, index) => index === 3);
    //         }
    //         return data;
    //       },
    //     },
    //     axis: {
    //       y: {
    //         position: "right",
    //         title: "Signatories",
    //         style: { titleFill: "#5AD8A6" },
    //       },
    //     },
    //   },
    // ],
    scale: {
      x: {
        type: "time",
      },
      // y: { nice: true },
    },
    slider: {
      x: {
        values: [0.8, 1.0],
        labelFormatter: (d) => format(d, "shortTime"),
      },
      y: { values: [0.8, 1.0], labelFormatter: "~s" },
    },
    annotations: [
      {
        type: "lineY",
        yField: 20000,
        style: { stroke: "#F4664A", strokeOpacity: 1, lineWidth: 5 },
      },
    ],
  };

  const config_liquid = {
    percent: percent,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };
  const endTime = new Date("2024-03-07 23:59:59");
  const nowTime = new Date();
  const endDiff = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
  const leftTime = endDiff > 0 ? endDiff : 0;
  const days_left = parseInt(leftTime / (24 * 60 * 60));

  return (
    <>
      <a
        href="https://github.com/Foldblade/track-make-transport-concessions-available-to-all-students-in-nsw/"
        className="github-corner"
        aria-label="View source on GitHub"
      >
        <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: 130 + "px" + "," + 106 + "px" }}
            className="octo-arm"
          ></path>
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          ></path>
        </svg>
      </a>
      <main>
        <div className="container">
          <div className="chart line">
            <Line {...config} autoFit="true" />
          </div>
          <div className="chart liquid">
            <Liquid {...config_liquid} width={200} height={200} />
          </div>

          <div>
            United, international students in NSW! <br />
            Sign for{" "}
            <a href="https://www.parliament.nsw.gov.au/la/Pages/ePetition-details.aspx?q=tabuKTP7hWgVFy0qTdhC7w">
              Make transport concessions available to all students in NSW
            </a>
            !
          </div>
          <div>
            <QRCodeSVG
              value="https://www.parliament.nsw.gov.au/la/Pages/ePetition-details.aspx?q=tabuKTP7hWgVFy0qTdhC7w"
              includeMargin="true"
            />
          </div>
          <div>Only {days_left} Day(s) left</div>
          <div>Fetch data every five minutes</div>
          <div>
            Thanks <b>Jet Hunt</b> who created this ePetition.
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
