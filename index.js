const fetch = require('node-fetch');
const cheerio = require('cheerio');

const doScrap = pageNumber => {
  fetch(`http://www.allitebooks.com/page/${pageNumber}`)
    .then(res => res.text())
    .then(resList => {
      const $ = cheerio.load(resList);
      return Promise.all(
        Array.from($('#main-content article')).map(article => {
          return new Promise((resolve, reject) => {
            const book = {};
            book.id = article.attribs.id.split('-')[1];
            book.url = article.children[1].children[1].attribs['href'];
            book.slug = article.children[1].children[1].attribs['href'].split(
              '/'
            )[3];
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
                resolve(book);
              })
              .catch(error => reject(error));
          });
        })
      );
    })
    .then(books => {
      console.log(books.length);
      if (pageNumber < 5) doScrap(pageNumber + 1);
    })
    .catch(error => {
      console.log(error);
    });
};

doScrap(1);
