const fetch = require('node-fetch');
const cheerio = require('cheerio');

let books = [];

fetch('http://www.allitebooks.com/')
  .then(res => res.text())
  .then(resText => {
    const $ = cheerio.load(resText);
    $('#main-content article').each((i, article) => {
      let book = {};
      book.id = article.attribs.id.split('-')[1];
      book.url = article.children[1].children[1].attribs['href'];
      book.slug = article.children[1].children[1].attribs['href'].split('/')[3];
      books.push(book);
    });
    console.log(books);
  })
  .catch(error => {
    console.log(error);
  });
