import { MathChart, type MathChartParams } from "./math-chart";

export function setMathChart(element: HTMLDivElement) {
  const params: MathChartParams = {
    formulas: ["log(x + 1)", "x", "x * x", "exp(x) -1 ", "sqrt(x)"],
  };
  const mcharts = new MathChart(element);
  mcharts.setOption(params);
  mcharts.render();
}
