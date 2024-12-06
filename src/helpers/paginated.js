require("dotenv").config();
const URL = process.env.URL;

const nextRequest = (pages, page, site) => {
  if (page < pages) {
    return `${URL}${site}page=${+page + 1}`;
  }
  return null;
};

const prevRequest = (page, site) => {
  if (+page === 1) {
    return null;
  }
  return `${URL}${site}page=${+page - 1}`;
};

function navegation(pages, page, site) {
  return {
    next: nextRequest(pages, page, site),
    prev: prevRequest(page, site),
  };
}

module.exports = navegation;
