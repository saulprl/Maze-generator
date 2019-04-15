let cells;
let current;
let rows, cols, scl;
let stack;
let slider;
let par;

function setup() {
    createCanvas(600, 602);

    slider = createSlider(5, 60, 15, 5);
    par = createP();
    frameRate(slider.value());
    scl = 20;
    rows = floor(height / scl);
    cols = floor(width  / scl);
    cells = [];
    stack = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            cells.push(new Cell(i, j, scl));
        }
    }
    current = cells[index(0, 0)];
    current.visit();
}

function draw() {
    background(51);
    frameRate(slider.value());

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            cells[index(i, j)].show();
        }
    }

    fill(220, 150, 50);
    strokeWeight(1);
    rect(current.x, current.y + 1, current.w - 2, current.w - 2);

    let next = current.checkNeighbors();
    if (next) {
        stack.push(current);
        current.knockWallDown(next);
        next.visit();
        current = next;
    } else if (stack.length > 0) {
        current.returned();
        current = stack.pop();
        current.returned();
    }

    par.html('Frame rate: ' + floor(frameRate()));
}

function index(i, j) {
    if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1) {
        return -1;
    }
    return j + i * rows;
}