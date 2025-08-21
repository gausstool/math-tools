import { map } from "./math";
import * as math from "mathjs";

export interface MathChartOptions {
  xrange: [number, number];
  yrange: [number, number];
  formulas: string[];
}

export type MathChartParams = Partial<MathChartOptions>


export class MathChart {
  element: HTMLDivElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  option: MathChartOptions = {
    xrange: [-10, 10],
    yrange: [-10, 10],
    formulas: ["0"],
  };

  colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272', '#FC8452', '#9A60B4', '#EA7CCC', '#27727B', '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'];

  constructor(element: HTMLDivElement) {
    this.element = element;
    this.canvas = document.createElement("canvas");
    this.canvas.width = element.clientWidth;
    this.canvas.height = element.clientHeight;
    this.ctx = this.canvas.getContext("2d")!;
    this.element.appendChild(this.canvas);
  }

  setOption(options: MathChartParams) {
    this.option = { ...this.option, ...options };
  }

  private drawXAxis() {
    this.ctx.beginPath();
    this.ctx.moveTo(-this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, 0);
    this.ctx.stroke();
  }

  private drawYAxis() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, -this.canvas.height / 2);
    this.ctx.lineTo(0, this.canvas.height / 2);
    this.ctx.stroke();
  }

  private drawFormula() {
    this.ctx.beginPath();
    const start = -this.canvas.width / 2;
    const end = this.canvas.width / 2;
    const step = 0.1;
    this.option.formulas.forEach((formula, index) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.colors[index];
      this.ctx.lineWidth = 1;

      let px = start;
      let y = 0;
      let formulaFn = math.compile(formula);
      while (px <= end) {
        const x = map(
          px,
          start,
          end,
          this.option.xrange[0],
          this.option.xrange[1]
        );
        y = formulaFn.evaluate({ x });
        const py = map(
          y,
          this.option.yrange[0],
          this.option.yrange[1],
          -this.canvas.height / 2,
          this.canvas.height / 2
        );
        this.ctx.lineTo(px, -py);
        px += step;
      }
      this.ctx.stroke();
    });
  }

  render() {
    this.canvas.width = this.element.clientWidth;
    this.canvas.height = this.element.clientHeight;
    this.ctx.translate(this.element.clientWidth / 2, this.element.clientHeight / 2);
    this.drawXAxis();
    this.drawYAxis();
    this.drawFormula();
  }
}
