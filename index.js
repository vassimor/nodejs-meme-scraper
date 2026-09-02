import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

async function fetchCreateFile() {

  const html= await fetch(`https://memegen-link-examples-upleveled.netlify.app` );
  const htmlText= await html.text();
  const $ = cheerio.load(htmlText);
  const firstTenImages = $('img').slice(0,10).map((i, el) => $(el).attr('src')).get();


  // For every src in firstTenImages, fetch the image , transform to buffer and save it to the images folder



 firstTenImages.forEach(async (src, index) => {


  const imageResponse = await fetch(src);


  const imageBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(imageBuffer);





// Here we ae checking if the memes/images folder exists, if not we create it. Then we write the image buffer to a file in that folder.
    if (!fs.existsSync('memes')) {
      fs.mkdir('memes', { recursive: true });
    }



    fs.writeFileSync(path.join('memes', `image0${index+1}.jpg`), buffer);
  })}















fetchCreateFile();

