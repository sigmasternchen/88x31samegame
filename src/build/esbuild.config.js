import esbuild from "esbuild";
import {bannerIndex} from "./banner-index.js";

const config = {
    entryPoints: ['./src/main.ts'],
    bundle: true,
    outfile: './public/bundle.js',
    plugins: [bannerIndex],
};

try {
    if (process.argv.indexOf("--watch") >= 0) {
        const ctx = await esbuild.context(config);

        console.log("Watching...");
        await ctx.watch();
    } else {
        console.log("Building...");
        await esbuild.build(config);
    }
} catch (e) {
    console.error(e);
    process.exit(1);
}