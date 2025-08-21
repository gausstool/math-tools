import { map } from "./math";
import { abs, add, compile, round } from "mathjs";

export interface MathChartOptions {
  xrange: [number, number];
  yrange: [number, number];
  formulas: string[];
}

export type MathChartParams = Partial<MathChartOptions>;

export class MathChart {
  element: HTMLDivElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  option: MathChartOptions = {
    xrange: [-5, 5],
    yrange: [-5, 5],
    formulas: ["0"],
  };

  colors = [
    "#5470C6",
    "#91CC75",
    "#FAC858",
    "#EE6666",
    "#73C0DE",
    "#3BA272",
    "#FC8452",
    "#9A60B4",
    "#EA7CCC",
    "#27727B",
    "#FE8463",
    "#9BCA63",
    "#FAD860",
    "#F3A43B",
    "#60C0DD",
    "#D7504B",
    "#C6E579",
    "#F4E001",
    "#F0805A",
    "#26C0C0",
  ];

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
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#000";    
    this.ctx.moveTo(-this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, 0);
    this.ctx.stroke();
  }

  private drawYAxis() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#000";
    this.ctx.moveTo(0, -this.canvas.height / 2);
    this.ctx.lineTo(0, this.canvas.height / 2);
    this.ctx.stroke();
  }

  private drawGrid() {
    this.ctx.lineWidth = 0.5;
    const [startX, endX] = this.option.xrange;
    const [startY, endY] = this.option.yrange;
    const step = 0.1;
    for (let x = startX; x <= endX; x = add(x, step)) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = abs(round(x, 2) % 1) < 0.01 ? "#ccc" : "#eee";    
      const px = map(
        x,
        this.option.xrange[0],
        this.option.xrange[1],
        -this.canvas.width / 2,
        this.canvas.width / 2
      );
      this.ctx.moveTo(px, -this.canvas.height / 2);
      this.ctx.lineTo(px, this.canvas.height / 2);
      this.ctx.stroke();
    }
    for (let y = startY; y <= endY; y = add(y, step)) {
      this.ctx.strokeStyle = abs(round(y, 2) % 1) < 0.01 ? "#ccc" : "#eee";
      this.ctx.beginPath();
      const py = map(
        y,
        this.option.yrange[0],
        this.option.yrange[1],
        -this.canvas.height / 2,
        this.canvas.height / 2
      );
      this.ctx.moveTo(-this.canvas.width / 2, py);
      this.ctx.lineTo(this.canvas.width / 2, py);
      this.ctx.stroke();
    }
  }

  private drawFormula() {
    this.ctx.beginPath();
    const start = -this.canvas.width / 2;
    const end = this.canvas.width / 2;
    const step = 0.1;
    this.ctx.lineWidth = 2;
    this.option.formulas.forEach((formula, index) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.colors[index];
      let px = start;
      let y = 0;
      let formulaFn = compile(formula);
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
    this.ctx.translate(
      this.element.clientWidth / 2,
      this.element.clientHeight / 2
    );
    this.drawGrid();
    this.drawXAxis();
    this.drawYAxis();
    this.drawFormula();
  }
}
