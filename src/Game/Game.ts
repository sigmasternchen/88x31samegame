import {Board} from "./Board";
import {Tile} from "./Tile";

const threshold: number = 3;

export class Game {
    private board: Board;
    private score: number = 0;
    private gameInfo: HTMLElement;
    private gameover: HTMLElement;

    constructor(
        boardElement: HTMLElement,
        gameInfo: HTMLElement,
        gameover: HTMLElement,
        bannerSelection: string[]
    ) {
        this.gameInfo = gameInfo;
        this.gameover = gameover;
        this.board = new Board(boardElement, this.clickHandler);
        this.board.makeTiles(bannerSelection);

        this.render();
    }

    private updateScore(n: number) {
        this.score += n * 100;
        this.score += (n - 3) * 200;
    }

    private checkGameState() {
        if (!this.board.hasMove(threshold)) {
            this.gameInfo.style.opacity = "0";
            this.gameover.style.display = "block";
            this.gameover.innerHTML = `
                <h1>Game Over</h1>
                <h2>Score: ${this.getScoreString()}</h2>
                <a href="/">Try again!</a>
            `;
        }
    }

    private getScoreString() {
        return (this.score.toString().padStart(7, "0"))
    }

    private render() {
        this.board.render();

        this.gameInfo.innerText = `Score: ${this.getScoreString()}`
    }

    private clickHandler = (tile: Tile) => {
        const neighbors = tile.findSimilarNeighbors([]);
        if (neighbors.length >= threshold) {
            this.board.remove(neighbors);
            this.updateScore(neighbors.length);
            this.checkGameState();
            this.render();
        }
    }
}