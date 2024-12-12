const pool = require("../database/conexion");
const responseData = require("../utils/response");
const { addAuditProduct } = require("./productAuditController");

const productCreate = async (
  idUser,
  nameProduct,
  codeProduct,
  priceProduct,
  urlProduct,
  stockProduct,
  madeProduct,
  descriptionProduct,
  dateIntroProduct
) => {
  const [codeExist] = await pool.query(
    `SELECT codeProduct FROM product WHERE codeProduct = ?`,
    [codeProduct]
  );

  if (codeExist.length) {
    throw Error(`Este codigo ya se encuentra registrado`);
  }

  const [data] = await pool.query(
    `INSERT INTO product (nameProduct, codeProduct, priceProduct, urlProduct, stockProduct, madeProduct, descriptionProduct, dateIntroProduct) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      nameProduct,
      codeProduct,
      priceProduct,
      urlProduct,
      stockProduct,
      madeProduct,
      descriptionProduct,
      dateIntroProduct,
    ]
  );

  await addAuditProduct(
    idUser,
    (idProduct = data.insertId),
    1,
    {},
    {
      idUser,
      nameProduct,
      codeProduct,
      priceProduct,
      urlProduct,
      stockProduct,
      madeProduct,
      descriptionProduct,
      dateIntroProduct,
    }
  );

  return {
    state: "create-product",
    data: await getAllProducts(),
  };
};

const getAllProducts = async (page) => {
  if (!page) {
    page = 1;
  }

  const [data] = await pool.query(
    `SELECT * FROM product WHERE isDeletedProduct = false`
  );
  return responseData(data, page, "product?");
};

const getIdProducts = async (idProduct) => {
  const [data] = await pool.query(`SELECT * FROM product WHERE idProduct = ?`, [
    idProduct,
  ]);
  if (!data.length) {
    throw Error(`El producto buscado no existe`);
  }
  return data[0];
};

const deleteProduct = async (idProduct) => {
  await getIdProducts(idProduct);
  await pool.query(
    `UPDATE product SET isDeletedProduct = ? WHERE idProduct = ?`,
    [true, idProduct]
  );
  return { state: "product-delete", data: await getAllProducts() };
};

const updateProduct = async (
  idProduct,
  nameProduct,
  codeProduct,
  priceProduct,
  urlProduct,
  stockProduct,
  madeProduct,
  descriptionProduct,
  dateIntroProduct,
  stateProduct
) => {
  await getIdProducts(idProduct);
  const [codeExist] = await pool.query(
    `SELECT codeProduct FROM product WHERE codeProduct = ? AND idProduct != ? `,
    [codeProduct, idProduct]
  );
  if (codeExist.length) {
    throw Error(`Este codigo ya se encuentra registrado`);
  }
  await pool.query(
    `UPDATE product SET nameProduct = ?, codeProduct = ?, priceProduct = ?, urlProduct = ?, stockProduct = ?, madeProduct = ?, descriptionProduct = ?, dateIntroProduct = ?, stateProduct = ? WHERE idProduct = ?`,
    [
      nameProduct,
      codeProduct,
      priceProduct,
      urlProduct,
      stockProduct,
      madeProduct,
      descriptionProduct,
      dateIntroProduct,
      stateProduct,
      idProduct,
    ]
  );
  return getIdProducts(idProduct);
};

const seeRemoveProducts = async (page) => {
  if (!page) {
    page = 1;
  }
  const [data] = await pool.query(
    `SELECT * FROM product WHERE isDeletedProduct = true`
  );
  return responseData(data, page, "product?flag=delete&");
};

module.exports = {
  productCreate,
  getAllProducts,
  getIdProducts,
  deleteProduct,
  updateProduct,
  seeRemoveProducts,
};
