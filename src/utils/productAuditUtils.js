function clearAuditProduct(list) {
  const data = list.map(
    ({
      nameProduct,
      codeProduct,
      nameUser,
      nameAction,
      timeAction,
      oldData,
      newData,
    }) => ({
      nameProduct,
      codeProduct,
      nameUser,
      nameAction,
      timeAction,
      oldData: JSON.parse(oldData),
      newData: JSON.parse(newData),
    })
  );
  return data;
}

module.exports = {
  clearAuditProduct,
};
