const LINE_LENGTH = 20;
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.lineWidth = 1;

const lines = [];

for (let yPos = 0; yPos < window.innerHeight; yPos += LINE_LENGTH) {
  for (let xPos = 0; xPos < window.innerWidth; xPos += LINE_LENGTH) {
    const line = new Line(xPos, yPos);
    lines.push(line);
  }
}

function Line(x, y) {
  this.x = x;
  this.y = y;

  this.draw = () => {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + LINE_LENGTH - 2);
    // ctx.rotate(45 * Math.PI / 180);
    ctx.stroke();
  };
}

function animate() {
  // requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  lines.forEach(line => {
    line.draw();
  });
}

animate();
