const navegation = require("../helpers/paginated");
const elementes = 20;

function countPages(array) {
  return Math.ceil(array.length / elementes);
}

function operation(data, init, end) {
  let response = [];
  for (let i = init; i <= end; i++) {
    if (data[i]) {
      response.push(data[i]);
    }
  }
  return response;
}

function responseResults(data, limit) {
  if (limit === 1) {
    return operation(data, 0, 19);
  } else {
    return operation(data, elementes * (limit - 1), elementes * limit - 1);
  }
}

function info(data, page, site) {
  const pages = countPages(data);
  if (page > pages) {
    throw Error(`There is nothing here`);
  }
  return {
    count: data.length,
    pages,
    ...navegation(pages, page, site),
  };
}

function responseData(results, page, site) {
  return {
    info: info(results, page, site),
    results: responseResults(results, page),
  };
}

module.exports = responseData;
