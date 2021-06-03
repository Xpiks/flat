// This can be a typescript file as well

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON, removeFile } from 'https://deno.land/x/flat@0.0.10/mod.ts' 

const filename = Deno.args[0]
const json = await readJSON(filename)

const stats = new Array();

for (let i = 0; i < json.length; i++) {
    const release = json[i];

    for (let j = 0; j < release.assets.length; j++) {
        const asset = release.assets[j];
        if (asset.state !== "uploaded") { continue; }

        let stat = new Map();
        stat["file"] = asset.name;
        stat["tag"] = release.tag;
        stat["release"] = release.name;
        stat["download_count"] = asset.download_count;

        stats.push(stat);
    }
}

const newFilename = `data.json` // name of a new file to be saved
await writeJSON(newFilename, stats) // create a new JSON file with just the Bitcoin price
console.log("Wrote a post process file")

// Optionally delete the original file
await removeFile('./data-raw.json')
