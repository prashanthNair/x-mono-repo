import React, { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell, Line, Text, ResponsiveContainer, Legend } from "recharts";
import { graph } from "../Constants";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const RADIAN = Math.PI / 180;
const data1 = [
  { id: 1, name: "Poor", value: 20 },
  { id: 2, name: "Below average", value: 20 },
  { id: 3, name: "Average", value: 10 },
  { id: 4, name: "Good", value: 20 },
  { id: 5, name: "Very good", value: 10 },
  { id: 6, name: "Excellent", value: 20 },
];

const PieChartWithTicks = ({ itemData }: any) => {
  const { chartData: data, column_names: colnames, title } = itemData;
  const config = graph.piewithneedle;
  const ticks: any[] = [];
  const tickLength = 8; //length of tick
  const gapDistance = 15; // Adjust the gap distance as needed
  const tickCount = 11; // Number of ticks (0, 10, 20, ..., 100)

  const chartContainerRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({
    width: 500, // initial width
    height: 400, // initial height
  });
  const roundToNearest100 = (number) => {
    if (number % 100 === 0) {
      return number;
    }
    const higherMultiple = Math.floor(number / 100) * 100 + 100;
    return higherMultiple;
  };
  const needleValue = data[0]?.[colnames[0]] ? data[0]?.[colnames[0]] : 0;
  const t = roundToNearest100(needleValue);
  const tickInterval = t / 10; // Interval between ticks
  const handleResize = () => {
    if (chartContainerRef.current) {
      const container = chartContainerRef.current as HTMLElement;
      setChartDimensions({
        width: container?.offsetWidth,
        height: container?.offsetHeight,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (chartContainerRef.current) {
      const container = chartContainerRef.current as HTMLElement;
      setChartDimensions({
        width: container?.offsetWidth,
        height: container?.offsetHeight,
      });
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { width } = chartDimensions;
  const cx = width / 2;
  const cy = 280;
  const iR = 100;
  const oR = 120;
  const moveNeedle = tickInterval / 10;
  const value = data[0]?.[colnames[0]] ? data[0]?.[colnames[0]] / moveNeedle : 0; //actual value for needle
  const actualTickValue = data[0]?.[colnames[0]] ? data[0]?.[colnames[0]] : 0;

  const getColorsValueByIndex = () => {
    let cumulativeSum = 0;
    for (let i = 0; i < data1.length; i++) {
      cumulativeSum += data1[i].value;
      if (cumulativeSum >= value) {
        return config.graphColor[i];
      }
    }
    // If the targetValue is greater than the sum of all values, return the last index
    return config.graphColor[data.length - 1];
  };
  const needle = () => {
    let total = 0;
    data1.forEach((v: any) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;
    const color = getColorsValueByIndex();
    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke='none' key='circle' />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke='none'
        fill={color}
        key='path'
      />,
      <text key='text' x={x0 - 13} y={y0 + 30} fontSize='20' fill={color}>
        {actualTickValue.toFixed(2)}
      </text>,
    ];
  };
  const addTick = () => {
    for (let i = 0; i < tickCount; i++) {
      const angle = (180 / (tickCount - 1)) * i;
      const cosValue = Math.cos((angle + 180) * RADIAN); // Adjusted the angle calculation
      const sinValue = Math.sin((angle + 180) * RADIAN); // Adjusted the angle calculation
      const tickValue = i * tickInterval;
      const tick = (
        <g key={i}>
          <Line
            type='monotone'
            strokeWidth={1}
            dataKey='value'
            dot={false}
            points={[
              {
                x: cx + cosValue * (oR + gapDistance),
                y: cy + sinValue * (oR + gapDistance),
              },
              {
                x: cx + cosValue * (oR + gapDistance + tickLength),
                y: cy + sinValue * (oR + gapDistance + tickLength),
              },
            ]}
            stroke='#000'
          />
          <Text
            x={cx + cosValue * (oR + gapDistance + tickLength + 15)} // Adjusted the x-position for the label with gap
            y={cy + sinValue * (oR + gapDistance + tickLength + 15)} // Adjusted the y-position for the label with gap
            textAnchor='middle'
            fill='#333'
            fontSize={config.fontSize}>
            {tickValue}
          </Text>
        </g>
      );
      ticks.push(tick);
    }
  };
  addTick();

  return (
    <Box ref={chartContainerRef} className='pieChartneedle pageGraph'>
      <Typography variant='p3semibold' className='heading'>
        {title}
      </Typography>
      <ResponsiveContainer width={config.width} height={config.height}>
        <PieChart height={500}>
          <Pie
            dataKey='value'
            startAngle={180}
            endAngle={0}
            data={data1}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill='#8884d8'
            stroke='none'>
            {data1.map((entry, index) => (
              <Cell
                key={`cell-${entry?.id}`}
                fill={config.graphColor[index % config.graphColor.length]}
              />
            ))}
          </Pie>
          {ticks}
          {needle()}
          {config.showLegend && (
            <Legend
              verticalAlign={config.legendPosition as any}
              iconType={config?.iconType as any}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartWithTicks;
