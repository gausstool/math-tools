/**
 * 将输入值从一个范围映射到另一个范围。
 * 
 * @param x - 需要进行映射的输入值。
 * @param in_min - 输入值的最小值。
 * @param in_max - 输入值的最大值。
 * @param out_min - 输出值的最小值。
 * @param out_max - 输出值的最大值。
 * @returns 映射到输出范围后的值。
 */
export const map = (x: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

/**
 * 线性插值函数，用于计算两个值之间的插值。
 * 
 * @param x - 输入值，用于确定插值的位置，范围为0到1。
 * @param y1 - 第一个值，插值的起始点。
 * @param y2 - 第二个值，插值的结束点。
 * @returns 插值结果，位于y1和y2之间。
 */
export const lerp = (x: number, y1: number, y2: number) => {
  return y1 + (y2 - y1) * x;
}
