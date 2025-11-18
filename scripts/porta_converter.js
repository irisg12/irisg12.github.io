function draw_staff(startY) {
    staff = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    staff.setAttribute("width", "620");
    staff.setAttribute("height", "100"); // figure out where these are being placed

    startX = 15;
    endX = 615;
    spacing = 12;

    for (let i = 0; i < 5; i++) { // why is this fine if line is lcoal
        line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", startX);
        line.setAttribute("y1", startY + i*spacing);
        line.setAttribute("x2", endX);
        line.setAttribute("y2", startY + i*spacing); 
        line.setAttribute("stroke", "black");

        staff.appendChild(line);
    }

    endbar1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    endbar1.setAttribute("x1", endX - spacing + 1);
    endbar1.setAttribute("y1", startY);
    endbar1.setAttribute("x2", endX - spacing + 1);
    endbar1.setAttribute("y2", startY + 4*spacing); 
    endbar1.setAttribute("stroke", "black");
    staff.appendChild(endbar1); 

    endbar2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    endbar2.setAttribute("x", endX - spacing/2);
    endbar2.setAttribute("y", startY);
    endbar2.setAttribute("width", spacing/2 + 1);
    endbar2.setAttribute("height", 4*spacing); 
    endbar2.setAttribute("fill", "black");
    staff.appendChild(endbar2);

    return staff;
}

//from https://solfa-co.de/secrets/ 
function draw_d(x, y) {
    note = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    head.setAttribute("cx", x)
    head.setAttribute("cy", y)
    head.setAttribute("rx", 8)
    head.setAttribute("ry", 5)
    head.setAttribute("stroke", "black");
    head.setAttribute("fill", "black");
    head.setAttribute("transform", `rotate(-30 ${x} ${y})`);
    
    stem = document.createElementNS("http://www.w3.org/2000/svg", "line");
    stem.setAttribute("x1", x + 8/2 * 1.76);
    stem.setAttribute("y1", y - 8/2 + 1);
    stem.setAttribute("x2", x + 8/2 * 1.76);
    stem.setAttribute("y2", y - 12 * 3.5); 
    stem.setAttribute("stroke", "black");
    stem.setAttribute("stroke-width", 2);
    
    note.appendChild(head);
    note.appendChild(stem); 

    return note;
}

function draw_o(x, y) {
    note = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    head.setAttribute("cx", x)
    head.setAttribute("cy", y)
    head.setAttribute("rx", 10)
    head.setAttribute("ry", 6)
    head.setAttribute("stroke", "black");
    head.setAttribute("fill", "black");

    hole = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    hole.setAttribute("cx", x)
    hole.setAttribute("cy", y)
    hole.setAttribute("rx", 5)
    hole.setAttribute("ry", 3)
    hole.setAttribute("stroke", "white");
    hole.setAttribute("fill", "white");
    hole.setAttribute("transform", `rotate (60 ${x} ${y})`)

    note.appendChild(head);
    note.appendChild(hole);
    return note;
}

// should i have made this another function
function draw_p(x, y) {
    note = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    
    head = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    head.setAttribute("cx", x)
    head.setAttribute("cy", y)
    head.setAttribute("rx", 8)
    head.setAttribute("ry", 5)
    head.setAttribute("stroke", "black");
    head.setAttribute("fill", "black");
    head.setAttribute("transform", `rotate(-30 ${x} ${y})`);
    
    stem = document.createElementNS("http://www.w3.org/2000/svg", "line");
    stem.setAttribute("x1", x - 8/2 * 1.76);
    stem.setAttribute("y1", y + 8/2 - 1);
    stem.setAttribute("x2", x - 8/2 * 1.76);
    stem.setAttribute("y2", y + 12 * 3.5); 
    stem.setAttribute("stroke", "black");
    stem.setAttribute("stroke-width", 2);
    
    note.appendChild(head);
    note.appendChild(stem); 
    return note;
}

function screen2SVG(svg, mouse) {
    pt = svg.createSVGPoint();
    pt.x = mouse.clientX;
    pt.y = mouse.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
}


staff_svg_h = 315;
staff_svg_w = 630;
//x0 = svg_width/2;
//y0 = svg_height/2;

staff_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
staff_svg.setAttribute("height", staff_svg_h.toString() );
staff_svg.setAttribute("width", staff_svg_w.toString() );

document.svg = document.body.appendChild(staff_svg);

staff_svg.appendChild(draw_staff(30));
staff_svg.appendChild(draw_d(30, 48));
staff_svg.appendChild(draw_p(60, 42));
staff_svg.appendChild(draw_o(90, 60));

note = null;
follow = false;

document.addEventListener("keyup", function(e) {
    if (e.key == '6') {
        note = draw_d(30,30); // fix
        staff_svg.appendChild(note); // is this optimal 
        follow = true;
       
    }
    else if (e.key == '9') staff_svg.appendChild(draw_p(30, 48));
    else if (e.key == '0') staff_svg.appendChild(draw_o(30, 48));
});

document.addEventListener("mousemove", function(m){
    if (follow) {
        pt = screen2SVG(staff_svg, m);
        note.setAttribute("transform", `translate (${pt.x}, ${pt.y})`);
    }
})
/*
<svg id="mysvg" width="500" height="500" style="border:1px solid black">
</svg>

<script>
const svg = document.getElementById("mysvg");
let circle = null;  // will store our one item
let following = false; // track if we're in follow mode

// Listen for key press
document.addEventListener("keydown", (e) => {
    if (e.key === "n" && !circle) {  // "n" creates the note
        circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("r", 10);
        circle.setAttribute("fill", "red");
        svg.appendChild(circle);
        following = true;
    }
});

// Listen for key release to stop following
document.addEventListener("keyup", (e) => {
    if (e.key === "n") {
        following = false;
    }
});

// Mouse move updates position if following
svg.addEventListener("mousemove", (e) => {
    if (following && circle) {
        let pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        let svgCoords = pt.matrixTransform(svg.getScreenCTM().inverse());
        circle.setAttribute("cx", svgCoords.x);
        circle.setAttribute("cy", svgCoords.y);
    }
});
</script> */
