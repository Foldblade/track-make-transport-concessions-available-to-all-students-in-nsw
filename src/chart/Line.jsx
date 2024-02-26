import { Line } from "@ant-design/plots";
import { format } from "fecha";

function MyLine({ data }) {
  const config = {
    data,
    xField: "Time",
    yField: "Signatories",
    axis: {
      y: {
        labelAutoHide: true,
        labelAutoRotate: true,
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
    },
    annotations: [
      {
        type: "lineY",
        yField: 20000,
        style: { stroke: "#F4664A", strokeOpacity: 1, lineWidth: 5 },
      },
    ],
  };

  return <Line {...config} autoFit />;
}

export default MyLine;
