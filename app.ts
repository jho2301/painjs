const canvas: HTMLCanvasElement = document.querySelector('#js-canvas');
const context: CanvasRenderingContext2D = canvas.getContext('2d');
const colors: Element[] = [...document.querySelectorAll('.js-control-color')];
const widthRange: HTMLInputElement = document.querySelector('#js-range');
const mode: HTMLButtonElement = document.querySelector('#js-mode');
const saveBtn: HTMLButtonElement = document.querySelector('#js-save');

let painting: boolean = false;
let filling: boolean = false;

canvas.width = 600;
canvas.height = 600;

context.strokeStyle = 'black';
context.lineWidth = 2.5;

function draw(event) {
  if (filling) {
    canvas.style.backgroundColor = <string>context.strokeStyle;
  } else {
    const x = event.offsetX;
    const y = event.offsetY;

    painting = true;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 0.1, y + 0.1);
    context.stroke();
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
    context.stroke();
  }
}

function stopDraw(event) {
  painting = false;
}

if (context) {
  context.fillStyle = 'white';
  context.fillRect(0, 0, 600, 600);
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);
  canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
}

if (colors) {
  colors.forEach((color) =>
    color.addEventListener('click', (e) => {
      context.strokeStyle = (e.target as HTMLDivElement).style.backgroundColor;
    })
  );
}

if (widthRange) {
  widthRange.addEventListener('input', (e) => {
    context.lineWidth = parseFloat((<HTMLInputElement>e.target).value);
  });
}

if (mode) {
  mode.addEventListener('click', () => {
    if (filling === true) mode.innerText = 'Fill';
    else mode.innerText = 'Brush';
    filling = !filling;
  });
}

if (saveBtn) {
  saveBtn.addEventListener('click', () => {
    const img: string = canvas.toDataURL('image/jpeg');
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = img;
    link.download = 'paintJSHaha.jpeg';
  });
}
