const fetch = require('node-fetch');
const cheerio = require('cheerio');

let books = [];

fetch('http://www.allitebooks.com/')
  .then(res => res.text())
  .then(resList => {
    const $ = cheerio.load(resList);
    $('#main-content article').each((i, article) => {
      let book = {};
      book.id = article.attribs.id.split('-')[1];
      book.url = article.children[1].children[1].attribs['href'];
      book.slug = article.children[1].children[1].attribs['href'].split('/')[3];
      fetch(book.url)
        .then(resTwo => resTwo.text())
        .then(resPage => {
          const $page = cheerio.load(resPage);
          book.description = $page('.entry-content p').text();
          book.downloadUrl = $page('.download-links a')
            .attr('href')
            .replace(/ /g, '%20');
          const values = $page('dl dd');
          book.authors = values.eq(0).text();
          book.isbn = values.eq(1).text();
          book.year = values.eq(2).text();
          book.pages = values.eq(3).text();
          book.language = values.eq(4).text();
          book.size = values.eq(5).text();
          book.format = values.eq(6).text();
          book.categories = values.eq(7).text();
          books.push(book);
          console.log(books);
        });
    });
  })
  .catch(error => {
    console.log(error);
  });
