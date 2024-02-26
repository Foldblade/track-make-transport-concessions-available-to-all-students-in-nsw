import React, { useEffect, useRef } from "react";
import { Liquid } from "@ant-design/plots";
function MyLiquid({ percent, width, height, autoFit }) {
  const config = {
    percent: percent,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    },
  };

  return <Liquid {...config} width={width} height={height} autoFit={autoFit} />;
}

export default MyLiquid;
