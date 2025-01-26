// @ts-ignore
import banners from 'banners';
import {Game} from "./Game/Game";

function getRandomBanners(n: number): string[] {
    let options = [...banners] as string[];
    const choices = [];

    for (let i = 0; i < n; i++) {
        const option = options[Math.floor(Math.random() * options.length)];
        choices.push("/banners/" + option);
        options = options.filter(opt => opt != option);
    }

    return choices;
}

window.addEventListener("load", () => {
    new Game(document.querySelector(".board"), getRandomBanners(5));
});