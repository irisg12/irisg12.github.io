// Draw an involute gear in your browser using JavaScript and SVG
// Tested on Internet Explorer 10 and Firefox 22

// Adapted from: Public Domain Parametric Involute Spur Gear by Leemon Baird, 2011, Leemon@Leemon.com http://www.thingiverse.com/thing:5505

// see also http://grabcad.com/questions/tutorial-how-to-model-involute-gears-in-solidworks-and-show-design-intent

pi=Math.PI;

// degrees to radians

function degrees_to_radians(theta) { return theta/180*pi; }

// polar to cartesian

function polar(r,theta) { return [r*Math.sin(theta), r*Math.cos(theta)]; }

// point on involute curve

function q6(b,s,t,d) { return polar(d,s*(iang(b,d)+t)); }

// unwind this many degrees to go from r1 to r2

function iang(r1,r2) { return Math.sqrt((r2/r1)*(r2/r1) - 1) - Math.acos(r1/r2); }

// radius a fraction f up the curved side of the tooth

function q7(f,r,b,r2,t,s) { return q6(b,s,t,(1-f)*Math.max(b,r)+f*r2); }

// rotate an array of 2d points

function rotate ( points_array, angle ) {
   var answer =[];
   for(var i=0; i<points_array.length; i++) {
      x=points_array[i][0];
      y=points_array[i][1];
      xr = x * Math.cos (angle) - y * Math.sin (angle);
      yr = y * Math.cos (angle) + x * Math.sin (angle);
      answer.push( [xr,yr] );
   }
  return answer;
}



// involute gear maker

function build_gear ( number_of_teeth  )
{

  p  = mm_per_tooth * number_of_teeth / pi / 2;  // radius of pitch circle
  c  = p + mm_per_tooth / pi - clearance;        // radius of outer circle
  b  = p * Math.cos(pressure_angle);             // radius of base circle
  r  = 2+p-(c-p)-clearance;                        // radius of root circle
  t  = mm_per_tooth / 2-backlash / 2;            // tooth thickness at pitch circle
  k  = -iang(b, p) - t/2/p;                      // angle where involute meets base circle on side of tooth

// here is the magic - a set of [x,y] points to create a single gear tooth

  points=[ polar(r, -3.142/number_of_teeth), polar(r, r<b ? k : -pi/number_of_teeth),
          q7(0/5,r,b,c,k, 1), q7(1/5,r,b,c,k, 1), q7(2/5,r,b,c,k, 1), q7(3/5,r,b,c,k, 1), q7(4/5,r,b,c,k, 1), q7(5/5,r,b,c,k, 1),
          q7(5/5,r,b,c,k,-1), q7(4/5,r,b,c,k,-1), q7(3/5,r,b,c,k,-1), q7(2/5,r,b,c,k,-1), q7(1/5,r,b,c,k,-1), q7(0/5,r,b,c,k,-1),
          polar(r, r<b ? -k : pi/number_of_teeth), polar(r, 3.142/number_of_teeth) ];

  var answer = [];

  // create every gear tooth by rotating the first tooth

  for (var i=0; i<number_of_teeth; i++ ) answer = answer.concat (  rotate( points, -i*2*pi/number_of_teeth - pi/2) );

  return answer; // returns an array of [x,y] points

}

function drawCycloid() {
  points = [360][2];
  //g3.x+g3.rad*9/8*Math.cos(g3.angle*pi/180)
  //g3.y+g3.rad*9/8*Math.sin(g3.angle*pi/180)
  for (var i=0; i < 360; i++){
    points[i] = [400+g3.rad*9/8*Math.cos(i*pi/180), 400+g3.rad*9/8*Math.sin(i*pi/180)];
  }
  return points;
}

class Gear {
  constructor(numTeeth) {
    this.numTeeth = numTeeth;
    this.x = x0;
    this.y = y0;
    this.angle = 0;
    this.rad = mm_per_tooth * this.numTeeth / pi / 2;

    this.img = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.img.setAttribute("stroke", "#000000");
    this.img.setAttribute("stroke-width", "3px");
    this.img.setAttribute("fill", "none"); // color based on size?

    svg_image.appendChild(this.img);
    document.xy_array = build_gear(this.numTeeth); // does this cause memory issues
    this.img.setAttribute("points", document.xy_array.toString());
  }
}

class Ring extends Gear {
  constructor(numTeeth) {
    super(numTeeth);
    this.img_ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.img_ring.setAttribute("r", (this.rad + mm_per_tooth/1.5).toString()); // fix the sizing to be relative
    this.img_ring.setAttribute("stroke", "#000000");
    this.img_ring.setAttribute("stroke-width", "3px");
    this.img_ring.setAttribute("fill", "none");
    this.img_ring.setAttribute("transform", `translate(${this.x} ${this.y})`)
    svg_image.appendChild(this.img_ring);
  }
}

// organize ur program structure bro
// gear parameter setup adjust to array or something

//number_of_teeth = 14 ; // number of teeth (typically the only parameter to change)
// note: rest of parameters must be unchanged if you want gears to fit.
mm_per_tooth = 4*2*pi; // pixel size of one gear tooth (even though it says millimeters, it's pixels) must be same for two gears to fit each other
pressure_angle= 20; // in degrees, determines gear shape, range is 10 to 40 degrees, most common is 20 degrees
clearance=4; // freedom between two gear centers
backlash=4; // freedom between two gear contact points
axle_radius=30; // center hole radius in pixels
pressure_angle = degrees_to_radians ( pressure_angle); // convert degrees to radians

// create svg image in webpage

svg_height = 630;
svg_width = 1260;
x0 = svg_width/2;
y0 = svg_height/2;

svg_image = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg_image.setAttribute("height", svg_height.toString() );
svg_image.setAttribute("width", svg_width.toString() );


trace_pt = document.createElementNS("http://www.w3.org/2000/svg", "circle");
trace_pt.setAttribute("r", 5 );
trace_pt.setAttribute("stroke", "#FF0000");
trace_pt.setAttribute("stroke-width", "3px");
trace_pt.setAttribute("fill", "none");

svg_image.appendChild(trace_pt);
document.svg = document.body.appendChild( svg_image );

//get some planetary OOP up in here

g1 = new Gear(30);
g1.x = x0;
g1.y = y0;
g1.img.setAttribute("transform", `translate(${g1.x},${g1.y})`);

g2 = new Gear(15);
g2.x = x0;
g2.y = y0;

r1 = new Ring(g1.numTeeth+2*g2.numTeeth);
//r2 = new Ring(24);

g3 = new Gear(8);
g2s = new Gear(8);

//g4 = new Gear()

cyc2 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
cyc2.setAttribute("stroke", "#FF0000");
cyc2.setAttribute("stroke-width", "3px");
cyc2.setAttribute("fill", "none");
svg_image.appendChild(cyc2);
document.xy_array = drawCycloid(); // does this cause memory issues - uh so yes 
 cyc2.setAttribute("points", document.xy_array.toString());

let start;
requestAnimationFrame(rotateGear);

function rotateGear(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;
  angle = (elapsed* .03); // maybe change
  omega1c = angle * r1.rad/(g1.rad+r1.rad);
  g2.angle = (g1.rad+g2.rad)/g2.rad*omega1c;
  g2.x = x0 + (g1.rad+g2.rad)*Math.cos(omega1c*pi/180);
  g2.y = y0 + (g1.rad+g2.rad)*Math.sin(omega1c*pi/180);
  x2p = (g1.rad+g2.rad*2)*Math.cos(omega1c*pi/180);
  y2p = (g1.rad+g2.rad*2)*Math.sin(omega1c*pi/180);
  r1.img.setAttribute("transform", `translate(${x0},${y0}) rotate(${angle} 0 0)`);
  g2.img.setAttribute("transform", `translate(${g2.x},${g2.y}) rotate(${g2.angle} 0 0)`);
  //r2.img.setAttribute("transform", `translate(${g2.x},${g2.y}) rotate(${g2.angle} 0 0)`);
  //r2.img_ring.setAttribute("transform", `translate(${g2.x},${g2.y}) rotate(${g2.angle} 0 0)`);
  g2s.angle = omega1c*1;
  g2s.img.setAttribute("transform", `translate(${g2.x},${g2.y}) rotate(${g2s.angle} 0 0)`);
  //r2.angle = g2.angle;
  //omega2c = r2.numTeeth/(g2s.numTeeth+r2.numTeeth)*r2.angle + g2s.numTeeth/(g2s.numTeeth+r2.numTeeth)*g2s.angle;
  //g3.angle = (g2s.numTeeth+g3.numTeeth)/g3.numTeeth*omega2c - g2s.numTeeth/g3.numTeeth*g2s.angle;
  g3.x = g2.x+(g2s.rad+g3.rad)*Math.cos(g2.angle*pi/180);
  g3.y = g2.y+(g2s.rad+g3.rad)*Math.sin(g2.angle*pi/180);
  g3.angle = g2.angle*5/3;
  g3.img.setAttribute("transform", `translate(${g3.x},${g3.y}) rotate(${g3.angle} 0 0)`);
  trace_pt.setAttribute("transform", `translate(${g3.x+g3.rad*9/8*Math.cos(g3.angle*pi/180)},${g3.y+g3.rad*9/8*Math.sin(g3.angle*pi/180)})`);
  requestAnimationFrame(rotateGear);
}

// two functions to respond to button clicks

function moreTeeth () {
  if ( number_of_teeth < 33 ) number_of_teeth++;
  document.xy_array = build_gear( number_of_teeth );
  gear1.setAttribute("points", document.xy_array.toString() );
}

function lessTeeth () {
  if ( number_of_teeth > 5 ) number_of_teeth--;
  document.xy_array = build_gear( number_of_teeth );
  gear1.setAttribute("points", document.xy_array.toString() );
}




