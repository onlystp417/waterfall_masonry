main();

async function main() {
  const wrapper = document.querySelector(".wrapper");
  const booksData = await fetchBooksData();

  wrapper.innerHTML = buildBookHTML(booksData);

  renderWaterfull();
}

async function fetchBooksData() {
  const response =  await fetch("https://bookshelf.goodideas-studio.com/api");
  const dataInJson = await response.json();
  const data = dataInJson.list;

  return data;
}

function buildBookHTML(booksData) {
  return booksData.map(book => {
    return `
    <a href="${book.link}" class="book grid-item col-12 col-sm-4 col-md-3 col-lg-2">
      <div class="book-photo">
        <img src="${book.image}" alt="${book.name}">
      </div>
      <div class="book-name">
        <span>書名：</span><span>${book.name}</span>
      </div>
      <div class="book-origin-price">
        <span>原價：</span><span>${book.originPrice}</span>
      </div>
      <div class="book-discount-price">
        <span>特價：</span><span>${book.sellPrice}</span>
      </div>
      <div class="book-isbn">
        <span>ISBN：</span><span>${book.ISBN}</span>
      </div>
    </a>`
  }).slice(0, 60).join("");
}

function renderWaterfull() {
  const msnry = new Masonry('.grid');
  msnry.layout();

  imagesLoaded('.grid').on( 'progress', function() {
    // layout Masonry after each image loads
    msnry.layout();
  });
}
