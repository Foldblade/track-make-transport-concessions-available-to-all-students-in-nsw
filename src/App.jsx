import React, { useState, useEffect } from "react";
import "./App.css";
import "@material/web/button/filled-button.js";
import { Line } from "@ant-design/plots";
import rawData from "./data.json5";
import { QRCodeSVG } from "qrcode.react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let newData = [];
    for (let i = 0; i < rawData.length; i++) {
      let time = new Date(rawData[i].time).toLocaleString();
      newData.push({
        Time: time,
        Signatories: parseInt(rawData[i].cnt),
        Aim: 20000,
      });
    }
    setData(newData);
  }, []);

  const config = {
    data,
    xField: "Time",
    legend: true,
    children: [
      {
        type: "line",
        yField: "Aim",
        style: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
      },
      {
        type: "line",
        yField: "Signatories",
        shapeField: "smooth",
        style: {
          stroke: "#5AD8A6",
          lineWidth: 4,
          opacity: 0.5,
        },
        label: {
          text: (datum) => `${datum.Signatories}`,
          style: {
            dy: -10,
            textAnchor: "middle",
          },
        },
        axis: {
          y: {
            position: "right",
            title: "Signatories",
            style: { titleFill: "#5AD8A6" },
          },
        },
      },
    ],
  };

  const endTime = new Date("2024-03-07 23:59:59");
  const nowTime = new Date();
  const endDiff = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);
  // 剩余时间
  const leftTime = endDiff > 0 ? endDiff : 0;
  const days_left = parseInt(leftTime / (24 * 60 * 60));

  return (
    <main>
      <div class="chart">
        <Line {...config} autoFit="true" />
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
    </main>
  );
}

export default App;
