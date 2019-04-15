class Cell {
    constructor(i, j, w) {
        this.i = i;
        this.j = j;
        this.w = w;
        this.x = this.j * this.w;
        this.y = this.i * this.w;
        this.visited = false;
        this.walls = [true, true, true, true];
        this.returning = false;
    }

    show() {
        noStroke();
        if (this.visited) {
            fill(210, 20, 255);
        } else {
            fill(85, 235, 100);
        }

        if (this.returning) {
            fill(43, 15, 235);
        }

        rect(this.x, this.y, this.w, this.w);

        this.buildWalls();
    }

    buildWalls() {
        stroke(0);
        strokeWeight(2);

        if (this.walls[0]) {
            line(this.x, this.y, this.x + this.w, this.y);
        }

        if (this.walls[1]) {
            line(this.x + this.w, this.y, this.x + this.w, this.y + this.w);
        }

        if (this.walls[2]) {
            line(this.x + this.w, this.y + this.w, this.x, this.y + this.w);
        }

        if (this.walls[3]) {
            line(this.x, this.y + this.w, this.x, this.y);
        }
    }

    checkNeighbors() {
        let neighbors = [];

        let topNeigh = cells[index(this.i - 1, this.j)];
        let rightNeigh = cells[index(this.i, this.j + 1)];
        let bottomNeigh = cells[index(this.i + 1, this.j)];
        let leftNeigh = cells[index(this.i, this.j - 1)];

        if (topNeigh && !topNeigh.visited) {
            neighbors.push(topNeigh);
        }
        if (rightNeigh && !rightNeigh.visited) {
            neighbors.push(rightNeigh);
        }
        if (bottomNeigh && !bottomNeigh.visited) {
            neighbors.push(bottomNeigh);
        }
        if (leftNeigh && !leftNeigh.visited) {
            neighbors.push(leftNeigh);
        }

        if (neighbors.length > 0) {
            let ran = floor(random(0, neighbors.length));
            return neighbors[ran];
        } else {
            return undefined;
        }
    }

    visit() {
        this.visited = true;
    }

    returned() {
        this.returning = true;
    }

    knockWallDown(next) {
        let yDiff = this.i - next.i;
        let xDiff = this.j - next.j;

        switch (xDiff) {
            case 0:
                switch (yDiff) {
                    case -1:
                        this.walls[2] = false;
                        next.walls[0] = false;
                        break;
                    case 1:
                        this.walls[0] = false;
                        next.walls[2] = false;
                        break;
                }
                break;
            case -1:
                this.walls[1] = false;
                next.walls[3] = false;
                break;
            case 1:
                this.walls[3] = false;
                next.walls[1] = false;
                break;
        }
    }
}