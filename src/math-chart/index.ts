import { map } from "./math";

export interface MathChartOptions {
  width: number;
  height: number;
  xrange: [number, number];
  yrange: [number, number];
  formulas: (string | Function)[];
}

export class MathChart {
  element: HTMLDivElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  option: MathChartOptions = {
    width: 800,
    height: 600,
    xrange: [-10, 10],
    yrange: [-10, 10],
    formulas: ["0"],
  };

  constructor(element: HTMLDivElement) {
    this.element = element;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.element.appendChild(this.canvas);
  }

  setOption(options: MathChartOptions) {
    this.option = { ...this.option, ...options };
  }

  private drawXAxis() {
    this.ctx.beginPath();
    this.ctx.moveTo(-this.option.width / 2,0);
    this.ctx.lineTo(this.option.width / 2, 0);
    this.ctx.stroke();
  }

  private drawYAxis() {
    this.ctx.beginPath();
    this.ctx.moveTo(0, -this.option.height / 2);
    this.ctx.lineTo(0, this.option.height / 2);
    this.ctx.stroke();
  }

  private drawFormula() {
    this.ctx.beginPath();
    let start = -this.option.width / 2;
    let end = this.option.width / 2;
    let step = 0.1;
    this.option.formulas.forEach(formula => {
      this.ctx.beginPath();
      let px = start;
      let y = 0;
      while (px <= end) {
        let x = map(px, start, end, this.option.xrange[0], this.option.xrange[1]);
        if (typeof formula === "function") {
          y = formula(x);
        } else {
          y = eval(formula.replace("x", x.toString()));
        }
        let py = map(y, this.option.yrange[0], this.option.yrange[1], -this.option.height / 2, this.option.height / 2);
        this.ctx.lineTo(px, -py);
        px += step;
      }
      this.ctx.stroke();
    })
  }

  render() {
    this.canvas.width = this.option.width;
    this.canvas.height = this.option.height;
    this.ctx.translate(this.option.width / 2, this.option.height / 2);
    this.drawXAxis();
    this.drawYAxis();
    this.drawFormula();
  }
}
