
export class Position {
    public readonly x: number
    public readonly y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getAdjacent() {
        return [
            new Position(this.x - 1, this.y),
            new Position(this.x + 1, this.y),
            new Position(this.x, this.y - 1),
            new Position(this.x, this.y + 1)
        ]
    }
}