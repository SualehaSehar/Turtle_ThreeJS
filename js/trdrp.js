import { Factory } from "/js/factory.js";

// Create your scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

var factory = new Factory(0, 0, 10, 10);

initialize();
animate();

var x, y, xradius, yradius, angle, cx, cy, startAngle, endAngle;

function initialize() {
  x = 0; // point px
  y = 0; // point py
  xradius = yradius = 1; // R
  angle = Math.PI / 4; // phi

  cx = 0 + x;
  cy = xradius * (Math.sin(Math.PI / 2) / Math.sin(angle)) + y;

  //var a = cx - x;
  //var b = cy - y;
  //var l = Math.sqrt(a * a + b * b);

  var noL = (2 * Math.PI) / (2 * angle); //number of leaves

  startAngle = angle - Math.PI / 2; // phi+x=90 --->  phi-90
  endAngle = Math.PI + angle;

  const angle1 = {
    x: 0,
    y: 0,
  };

  for (let i = 0; i < 1; i++) {
    const intervals = i * ((2 * Math.PI) / noL);

    //cx = ((Math.cos(intervals) * 1)) + x;
    //cy = ((Math.sin(intervals) * 1)) + y;

    console.log(startAngle * (180 / Math.PI), endAngle * (180 / Math.PI));
    console.log(cx, cy);

    const curve = new THREE.EllipseCurve(
      cx,
      cy, // ax, aY
      xradius,
      yradius, // xRadius, yRadius
      startAngle,
      endAngle, // aStartAngle, aEndAngle
      false // Clockwise
    );

    const points = curve.getPoints(50);
    const t1 = curve.getPointAt(0);
    const t2 = curve.getPointAt(1);

    points.push(new THREE.Vector3(x, y, 0)); //point p
    points.push(new THREE.Vector3(cx, cy, 0)); // point C

    points.push(new THREE.Vector3(x, y, 0));
    points.push(new THREE.Vector3(t1.x, t1.y, 0));
    points.push(new THREE.Vector3(x, y, 0));
    points.push(new THREE.Vector3(t2.x, t2.y, 0));

    const group = new THREE.Group();

    for (let i = 0; i < points.length; i++) {
      var material = new THREE.LineBasicMaterial({ color: "#000000" });
      var geometry = new THREE.Geometry().setFromPoints(points);
      var line = new THREE.Line(geometry, material);
      group.add(line);
    }

    scene.add(group);
    cx = Math.cos(intervals) * 1 + x;
    cy = Math.sin(intervals) * 1 + y + xradius;

    //angles
    startAngle = startAngle - Math.PI / 2;
    endAngle = endAngle - Math.PI + angle;
  }
}

function animate() {
  factory.renderScene(scene);
}
