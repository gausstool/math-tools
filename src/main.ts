import { setMathChart } from './app.ts';
const $app = document.querySelector<HTMLDivElement>('#app')!
const $container = document.createElement('div')
$container.classList.add('math-chart-container')
$app.appendChild($container)
setMathChart($container)
