/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

var Star = /*#__PURE__*/function () {
  function Star() {
    _classCallCheck(this, Star);

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2;
  }

  _createClass(Star, [{
    key: "draw",
    value: function draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = 'white';
      c.fill();
    }
  }]);

  return Star;
}();

var Planet = /*#__PURE__*/function () {
  function Planet(x, y, radius, color, velocity, orbitRadius) {
    _classCallCheck(this, Planet);

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
      y: y,
      radian: 0,
      velocity: (Math.random() + 0.1) / 30
    };
  }

  _createClass(Planet, [{
    key: "draw",
    value: function draw() {
      // Planet Path
      c.beginPath();
      c.lineWidth = 2;
      c.arc(this.startX, this.startY, this.orbitRadius, 0, Math.PI * 2, false);
      c.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      c.stroke(); // Planet

      c.shadowBlur = 15;
      c.shadowColor = this.color;
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.shadowBlur = 0; // Moon (not sun)

      if (this.velocity > 0) {
        c.beginPath();
        c.arc(this.moon.x, this.moon.y, 2, 0, Math.PI * 2, false);
        c.fillStyle = 'gray';
        c.fill();
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();

      if (this.velocity > 0) {
        this.radian += this.velocity;
        this.moon.radian += this.moon.velocity;
        this.moon.x = this.x + Math.cos(this.moon.radian) * (this.radius + 5);
        this.moon.y = this.y + Math.sin(this.moon.radian) * (this.radius + 5);
        this.x = this.startX + Math.cos(this.radian) * this.orbitRadius;
        this.y = this.startY + Math.sin(this.radian) * this.orbitRadius;
      }
    }
  }]);

  return Planet;
}();

var getPlanetForOptions = function getPlanetForOptions(radius, velocity, orbitRadius, color) {
  return new Planet(canvas.width / 2, canvas.height / 2, radius, color, velocity / 1000, orbitRadius);
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var planets;
var stars;

function init() {
  planets = [];
  stars = [];
  planets.push(getPlanetForOptions(35, 0, 0, 'yellow')); // sun

  planets.push(getPlanetForOptions(5, getRandomInt(5, 10), 65, 'gray')); // mercury

  planets.push(getPlanetForOptions(10, getRandomInt(4, 10), 90, 'orange')); // venus

  planets.push(getPlanetForOptions(15, getRandomInt(3, 10), 125, 'blue')); // earth

  planets.push(getPlanetForOptions(20, getRandomInt(3, 15), 175, 'red')); // mars

  planets.push(getPlanetForOptions(25, getRandomInt(3, 10), 225, 'orange')); // jupiter

  planets.push(getPlanetForOptions(20, getRandomInt(3, 10), 275, 'yellow')); // saturn

  planets.push(getPlanetForOptions(15, getRandomInt(3, 30), 325, 'blue')); // uranus

  planets.push(getPlanetForOptions(25, getRandomInt(1, 5), 375, 'purple')); // neptune

  planets.push(getPlanetForOptions(7, getRandomInt(1, 3), 450, 'gray')); // pluto

  for (var i = 0; i < 400; i++) {
    stars.push(new Star());
  }
}

init(); //animate();

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map