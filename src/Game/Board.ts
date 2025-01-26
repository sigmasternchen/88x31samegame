import {Tile} from "./Tile";
import {Position} from "./Position";

export class Board {
    private element: HTMLElement;
    private board: (Tile|null)[][] = [];
    private width: number;
    private height: number;
    private clickHandler: (tile: Tile) => void;

    constructor(element: HTMLElement, clickHandler: (tile: Tile) => void) {
        this.element = element;
        const computedStyle = window.getComputedStyle(document.body);
        this.width = parseInt(computedStyle.getPropertyValue('--size-x'));
        this.height = parseInt(computedStyle.getPropertyValue('--size-y'));
        this.clickHandler = clickHandler;
    }

    public makeTiles(bannerSelection: string[]) {
        for (let y = 0; y < this.height; y++) {
            this.board.push([]);
            for (let x = 0; x < this.width; x++) {
                this.board[y][x] = new Tile(
                    new Position(x, y),
                    bannerSelection[Math.floor(Math.random() * bannerSelection.length)],
                    this,
                    this.element,
                    this.clickHandler
                );
            }
        }
    }

    public getAtPosition = (position: Position): Tile|null =>
        this.board?.[position.y]?.[position.x];

    public render() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.board[y][x]?.render();
            }
        }
    }

    private applyGravity() {
        for (let y = 1; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.board[y][x]) {
                    const tile = this.board[y][x];
                    for (let fallto = y - 1; fallto >= 0 && !this.board[fallto][x]; fallto--) {
                        this.board[fallto + 1][x] = null;
                        tile.drop();
                        this.board[fallto][x] = tile;
                    }
                }
            }
        }
    }

    public remove(tiles: Tile[]) {
        for (const tile of tiles) {
            this.board[tile.getPosition().y][tile.getPosition().x] = null;
            tile.remove();
        }

        this.applyGravity();
        this.render();
    }
}