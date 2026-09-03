import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';

const html = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const text = await html.text();
const $ = cheerio.load(text);

// Slice the first ten images and run a map on them to extract the src of each one and put it in an array.
const imageSrcs = $('img')
  .slice(0, 10)
  .map((index, element) => {
    return $(element).attr('src');
  })
  .get();

// Now we have to fetch all the urls that are in the array imageSrcs.

for (let i = 0; i < imageSrcs.length; i++) {
  const response = await fetch(imageSrcs[i]);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (!fs.existsSync('memes')) {
    fs.mkdirSync('memes');
  }
  fs.writeFile(path.join('memes', `image0${i + 1}.jpg`), buffer, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
