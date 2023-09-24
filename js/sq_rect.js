
var sides = 4;
var geometry = new THREE.Geometry();
var startangle = 3 * Math.PI / 4;
var cx ;
var cy ;
var width;
var height;
var radian;
var v = geometry.vertices;
var material;
var colour;

export class Square {
    constructor(w, h,cxx,cyy,c) {
        width = w;
        height = h;
        cx = cxx;
        cy = cyy;
        colour=c;
        
    }

    drawSq() {

        for (let i = 0; i <= sides; i++) {

            radian = i * ((2.0 * Math.PI) / sides) + startangle;

            var points = new THREE.Vector3(
                Math.round(width * Math.cos(radian) + cx),
                Math.round(height * Math.sin(radian) + cy),
                0

            )
            
            v.push(points);
        }

        material = new THREE.LineBasicMaterial({ color: colour });
        var polygon = new THREE.Line(geometry, material);
        
        return polygon;
    }

    getVertices() {
        return v;
    }

    getwidth() {
        var d = Math.round(Math.sqrt(Math.pow((v[3].x - v[0].x),2)+Math.pow((v[3].y- v[0].y),2)));
        return d;
    }

    getheight() {
        var d = Math.round(Math.sqrt(Math.pow((v[1].x - v[0].x),2)+Math.pow((v[1].y- v[0].y),2)));
        return d;
    }
}