import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const Home = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chartDom = chartRef.current;
    // init chart object
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };
    // render chart with option
    option && myChart.setOption(option);
  }, []);
  return (
    <div>
      <div
        ref={chartRef}
        style={{ width: "500px", height: "400px", display: "block" }}
      ></div>
    </div>
  );
};

export default Home;
