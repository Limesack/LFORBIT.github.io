const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'white';
        c.fill();
    }
}

class Planet {
    constructor(x, y, radius, color, velocity, orbitRadius) {
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.radian = Math.PI * 2 * Math.random();
        this.orbitRadius = orbitRadius;
        this.moon = {
            x: this.x + this.orbitRadius + this.radius,
            y,
            radian: 0,
            velocity: (Math.random() + 0.1) / 30
        };
    }

    draw() {
        // Planet Path
        c.beginPath();
        c.lineWidth = 2;
        c.arc(
            this.startX,
            this.startY,
            this.orbitRadius,
            0,
            Math.PI * 2,
            false
        );
        c.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        c.stroke();

        // Planet
        c.shadowBlur = 15;
        c.shadowColor = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.shadowBlur = 0;

        // Moon (not sun)
        if (this.velocity > 0) {
            c.beginPath();
            c.arc(this.moon.x, this.moon.y, 2, 0, Math.PI * 2, false);
            c.fillStyle = 'gray';
            c.fill();
        }
    }

    update() {
        this.draw();
        if (this.velocity > 0) {
            this.radian += this.velocity;
            this.moon.radian += this.moon.velocity;
            this.moon.x =
                this.x + Math.cos(this.moon.radian) * (this.radius + 5);
            this.moon.y =
                this.y + Math.sin(this.moon.radian) * (this.radius + 5);

            this.x = this.startX + Math.cos(this.radian) * this.orbitRadius;
            this.y = this.startY + Math.sin(this.radian) * this.orbitRadius;
        }
    }
}

const getPlanetForOptions = (radius, velocity, orbitRadius, color) =>
    new Planet(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        color,
        velocity / 1000,
        orbitRadius
    );

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let planets;
let stars;
function init() {
    planets = [];
    stars = [];

    planets.push(getPlanetForOptions(35, 0, 0, 'yellow')); // sun
    planets.push(getPlanetForOptions(5, getRandomInt(5, 8), 65, 'gray')); // mercury
    planets.push(getPlanetForOptions(10, getRandomInt(4, 8), 90, 'orange')); // venus
    planets.push(getPlanetForOptions(15, getRandomInt(3, 8), 125, 'blue')); // earth
    planets.push(getPlanetForOptions(20, getRandomInt(3, 8), 175, 'red')); // mars
    planets.push(getPlanetForOptions(25, getRandomInt(3, 10), 225, 'orange')); // jupiter
    planets.push(getPlanetForOptions(20, getRandomInt(3, 10), 275, 'yellow')); // saturn
    planets.push(getPlanetForOptions(15, getRandomInt(3, 10), 325, 'blue')); // uranus
    planets.push(getPlanetForOptions(25, getRandomInt(1, 5), 375, 'purple')); // neptune
    planets.push(getPlanetForOptions(7, getRandomInt(1, 3), 450, 'gray')); // pluto

    for (let i = 0; i < 400; i++) {
        stars.push(new Star());
    }
}

init();
//animate();
