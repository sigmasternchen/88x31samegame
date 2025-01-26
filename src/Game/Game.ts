import {Board} from "./Board";
import {Tile} from "./Tile";

export class Game {
    private board: Board;

    constructor(boardElement: HTMLElement, bannerSelection: string[]) {
        console.log(bannerSelection);
        this.board = new Board(boardElement, this.clickHandler);
        this.board.makeTiles(bannerSelection);
        this.board.render();
    }

    private clickHandler = (tile: Tile) => {
        const neighbors = tile.findSimilarNeighbors([]);
        if (neighbors.length >= 3) {
            this.board.remove(neighbors);
        }
    }
}