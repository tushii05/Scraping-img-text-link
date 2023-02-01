const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
request('https://www.agnitotoday.com/us-universities-redesigning-their-syllabus-due-to-ai-text-use', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        //text======
        var text = $('p').text();
        fs.writeFileSync('text.txt', text);

        //img
        var imageUrl = $('img').attr('src');
        request(imageUrl).pipe(fs.createWriteStream('image.jpg'));

        //link
        const links = [];
        $('a').each(function () {
            links.push($(this).attr('href'));
        });
        fs.writeFile('links.json', JSON.stringify(links), (error) => {
        });
    }
});