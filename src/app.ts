import { MathChart, type MathChartOptions } from "./math-chart";

export function setupGeogebra(element: HTMLDivElement) {
  const params: MathChartOptions = {
    width: 800,
    height: 800,
    xrange: [-10, 10],
    yrange: [-10, 10],
    formulas: [
        "Math.log(x + 1) ",
        "x",
        "x * x",
    ],
  };
  const mcharts = new MathChart(element);
  mcharts.setOption(params);
  mcharts.render();
}
