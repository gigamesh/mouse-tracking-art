let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

function generateColor(){
    return '#' +  Math.random().toString(16).substr(-6);
  }

let mouse = {
  x: undefined,
  y: undefined
}

const maxRadius = 50;
const minRadius = 2;

const colorArr = [
  '#33536A',
  '#5494BA',
  '#EEDD67',
  '#DEA74A',
  '#D45F67',
];

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function Circle(x, y, dx, dy, radius){
  this.radius = radius;
  this.minRadius = radius;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArr[Math.floor(Math.random() * colorArr.length)];
  
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.lineWidth=1;
  }
  this.update = function(){
    if (this.x + this.radius > innerWidth ||
       this.x - this.radius < 0){
      this.dx = -this.dx;
    } 
    if (this.y + this.radius > innerHeight ||
       this.y - this.radius < 0){
      this.dy = -this.dy;
    } 
    this.x += this.dx;
    this.y += this.dy;
    
  ///interactivity
    if(mouse.x - this.x < 50 
      && mouse.x - this.x > -50
      && mouse.y - this.y < 50 
      && mouse.y - this.y > -50) {
      if(this.radius < maxRadius){
        this.radius +=1;        
      }
    } else if(this.radius > this.minRadius){
      this.radius -=1;
    }
    
    this.draw();
  }
}

let circArray = [];

for(let i = 0; i < 800; i++){
  var radius = Math.random() * 3 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - .5) * 5;
  let dy = (Math.random() - .5) * 5;
  circArray.push(new Circle(x, y, dx, dy, radius));
}

let circle = new Circle(200, 200, 3, 3, 30);

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  
  let arrLength = circArray.length;
  for(let i = 0; i < arrLength; i++){
    circArray[i].update();
  }
}

animate();