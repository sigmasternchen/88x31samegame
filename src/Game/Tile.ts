import {Position} from "./Position";
import {Board} from "./Board";
import {id} from "../utils";

export class Tile {
    private position: Position;
    private url: string;
    private element: HTMLElement;
    private board: Board;

    constructor(position: Position, url: string, board: Board, boardElement: HTMLElement, clickHandler: (tile: Tile) => void) {
        this.position = position;
        this.board = board;
        this.url = url;

        this.element = document.createElement("img");
        this.element.classList.add("tile");
        this.element.setAttribute("src", url);
        this.element.onclick = () => clickHandler(this);
        boardElement.append(this.element);
    }

    public getPosition(): Position {
        return this.position;
    }

    public findSimilarNeighbors(found: Tile[]) {
        found.push(this);
        this.position
            .getAdjacent()
            .map(this.board.getAtPosition)
            .filter(id)
            .filter(tile => tile.url == this.url)
            .forEach(neighbor => {
                if (found.indexOf(neighbor) < 0) {
                    neighbor.findSimilarNeighbors(found)
                        .forEach(tile => {
                            if (found.indexOf(tile) < 0)
                                found.push(tile)
                        });
                }
            })
        return found;
    }

    public render() {
        this.element.style.bottom = `calc(var(--tile-height) * ${this.position.y} + var(--padding) * ${this.position.y + 1})`;
        this.element.style.left = `calc(var(--tile-width) * ${this.position.x} + var(--padding) * ${this.position.x + 1})`;
    }

    public remove() {
        this.element.remove();
    }

    public drop() {
        this.position = new Position(this.position.x, this.position.y - 1);
    }
}