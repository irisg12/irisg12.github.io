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

function draw_d(x, y) {

}

function draw_o(x, y) {

}

function draw_p(x, y) {

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