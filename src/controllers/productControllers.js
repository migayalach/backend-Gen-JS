const pool = require("../database/conexion");

const productCreate = async (
  nameProduct,
  codeProduct,
  priceProduct,
  urlProduct,
  stockProduct,
  madeProduct,
  sizeProduct,
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
    `INSERT INTO product (nameProduct, codeProduct, priceProduct, urlProduct, stockProduct, madeProduct, sizeProduct, dateIntroProduct) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      nameProduct,
      codeProduct,
      priceProduct,
      urlProduct,
      stockProduct,
      madeProduct,
      sizeProduct,
      dateIntroProduct,
    ]
  );

  return { state: "create-product", data: await getAllProducts() };
};

const getAllProducts = async () => {
  const [data] = await pool.query(
    `SELECT * FROM product WHERE isDeletedProduct = false`
  );
  return data;
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
  sizeProduct,
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
    `UPDATE product SET nameProduct = ?, codeProduct = ?, priceProduct = ?, urlProduct = ?, stockProduct = ?, madeProduct = ?, sizeProduct = ?, dateIntroProduct = ?, stateProduct = ? WHERE idProduct = ?`,
    [
      nameProduct,
      codeProduct,
      priceProduct,
      urlProduct,
      stockProduct,
      madeProduct,
      sizeProduct,
      dateIntroProduct,
      stateProduct,
      idProduct,
    ]
  );
  return getIdProducts(idProduct);
};

const seeRemoveProducts = async () => {
  const [data] = await pool.query(
    `SELECT * FROM product WHERE isDeletedProduct = true`
  );
  return data;
};

module.exports = {
  productCreate,
  getAllProducts,
  getIdProducts,
  deleteProduct,
  updateProduct,
  seeRemoveProducts,
};
