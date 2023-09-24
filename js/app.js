import { Factory } from "/js/factory.js";
import * as TURTLE from "/js/turtle.js";

// Create your scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

var factory = new Factory(0, 0, 10, 20);

initialize();
animate();

var geometry;
function initialize() {
  spiral(-8, 9);
  box(-5, 9);
  polyspiral(-1, 9, 270);
  threejs(2, 8);
  maze(8, 9);

  drawS();
  drawRosette(-5, 4, 5);
  drawRosette(-2, 4, 8);
  drawRosette(1, 4, 12);
  drawtlogo(3, 3);
  drawtlogo2(7, 3.5);

  drawstr(-7, 0, "F+F+FFF+F+F+FFF+F+F+FFF+F+F+FFF+", 1);
  var point = new THREE.Vector2(-5, -2);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);

  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 1; i++) {
      t.forward(1, 0.5);
      t.turn(90);
      t.forward(1, 0.5);
      t.turn(90);
      t.forward(0.5, 0.5);
      t.turn(-90);
      t.forward(0.5, 0.5);
      t.turn(-90);
      t.forward(2, 0.5);

      t.turn(-90);
      t.forward(0.5, 0.5);
      t.turn(-90);

      t.forward(0.5, 0.5);
      t.turn(90);
      t.forward(1, 0.5);
      t.turn(90);
      t.forward(1, 0.5);
    }
  }

  scene.add(t.drawTurtle());

  square(5, -4);
  remainder(-5, -7);
  hookMotif(7, -6);
  logo(-8.1, -6.3);
}

function animate() {
  requestAnimationFrame(animate);

  factory.renderScene(scene);
}

function drawS() {
  var point = new THREE.Vector2(-7, 5);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);

  t.turn(120);
  //t.forward(5, true);

  for (var i = 0; i < 15; i++) {
    t.turn(15);
    t.forward(0.2, true);
  }

  for (var i = 0; i < 16; i++) {
    t.forward(0.2, true);
    t.turn(-15);
  }

  //t.forward(5, true);

  scene.add(t.drawTurtle());
}

function drawRosette(xpos, ypos, nv) {
  var path = new THREE.Path();

  var pt = generateVERTICES(nv);

  for (var i = 0; i < pt.length - 1; i++) {
    for (var j = i + 1; j < pt.length; j++) {
      path.moveTo(pt[i].x, pt[i].y);
      path.lineTo(pt[j].x, pt[j].y);
    }
  }
  const points = path.getPoints();

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });

  const line = new THREE.Line(geometry, material);
  scene.add(line);
  line.position.set(xpos, ypos, 0);
}

function generateVERTICES(nv) {
  var sides = nv;
  geometry = new THREE.Geometry();
  var radius = 1;
  var stangle = Math.PI / 2;

  for (let i = 0; i <= sides; i++) {
    var radian = i * ((2.0 * Math.PI) / sides) + stangle;

    let points = new THREE.Vector2(
      radius * Math.cos(radian),
      radius * Math.sin(radian),
      0
    );

    geometry.vertices.push(points);
  }

  return geometry.vertices;
}

function drawtlogo(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);

  for (var i = 0; i < 3; i++) {
    t.forward(1, true);
    t.turn(60);
    t.forward(1, true);
    t.turn(60);
    t.forward(1, true);
    t.turn(120);
  }

  scene.add(t.drawTurtle());
}

function drawtlogo2(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 60;

  var t = new TURTLE.Turtle(point, initAngle);

  for (var i = 0; i < 3; i++) {
    for (var j = 1; j <= 4; j++) {
      t.forward(1, true);
      if (j == 2) t.turn(120);
      else t.turn(60);
    }
    t.turn(180);
  }

  scene.add(t.drawTurtle());
}

function drawstr(xpos, ypos, str, dist) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);

  t.stringPATH(str, dist);

  scene.add(t.drawTurtle());
}

//tt.js
function spiral(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);

  var dist = 0.2;
  var num = 16;
  var i = 1;
  while (i != num) {
    t.forward(dist * i, 1);
    t.turn(-90);
    i++;
  }
  scene.add(t.drawTurtle());
}

function box(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);
  var dist = 0.2;
  for (var j = 0; j < 16; j++) {
    for (var c = 0; c < 4; c++) {
      t.forward(5 * dist, 1);
      t.turn(90);
    }
    t.turn(90);
  }
  t.turn(90);
  scene.add(t.drawTurtle());
}

function polyspiral(xpos, ypos, angle) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);
  var l = 0.2;
  for (var n = 1; n < 50; n++) {
    t.forward(l, 1);
    t.turn(angle);
    l += 0.1;
  }
  scene.add(t.drawTurtle());
}

function threejs(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);
  let ln = 3,
    angle = 120;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      if (j == 2) {
        t.forward(1.5, 1);
        t.turn(angle);
      } else {
        t.forward(ln, 1);
        t.turn(angle);
      }
      if (i == 1 && j == 2) {
        t.turn(240);
        t.forward(ln, 1);
      }
    }
    angle = -120;
    ln -= 1.5;
  }
  scene.add(t.drawTurtle());
}

function maze(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);
  let l = 0.4;
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 2; i++) {
      t.forward(l, 1);
      t.turn(-90);
    }
    l += 0.4;
  }
  scene.add(t.drawTurtle());
}

function square(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);
  let l = 0.5;
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 4; i++) {
      t.forward(l, 1);
      t.turn(90);
    }
    l += 0.5;
  }
  scene.add(t.drawTurtle());
}

function remainder(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);
  var l = 0.5;
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 7; i++) {
      if (i < 3) {
        t.forward(l, 1);
        t.turn(90);
        l -= 0.1;
      } else {
        l += 0.08;
        t.forward(l, 1);
        t.turn(-90);
      }
    }
    t.turn(90);
    t.forward(0.3, 1);
    t.turn(-90);
    t.forward(0.5, 1); //120
    l = 0.45;
    t.turn(90);
    t.forward(0.4, 1);
  }
  scene.add(t.drawTurtle());
}

function hookMotif(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);
  var L = 0.5;
  for (var s = 1; s <= 4; s++) {
    t.forward(3 * L, 1);
    t.turn(90);
    t.forward(L, 1);
    t.turn(90);
    t.forward(L, 1);
    t.turn(90);
  }
  scene.add(t.drawTurtle());
}

function shapes(xpos, ypos, line, angle) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);
  for (var i = 0; i < line; i++) {
    t.forward(5, 1);
    t.turn(angle);
  }
  scene.add(t.drawTurtle());
}

function logo(xpos, ypos) {
  var point = new THREE.Vector2(xpos, ypos);
  var initAngle = 0;

  var t = new TURTLE.Turtle(point, initAngle);
  shapes(-11, -8, 3, 120);

  for (var j = 1; j < 4; j++) {
    for (var i = 0; i < 2; i++) {
      t.turn(-40);
      t.forward(2.5, 1);
      t.turn(-120);
    }
    t.turn(-160);
  }
  scene.add(t.drawTurtle());
}
