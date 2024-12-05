const bcrypt = require("bcrypt");

function encryEmail(email) {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart =
    localPart.slice(0, 2) +
    "*".repeat(Math.max(localPart.length - 4, 0)) +
    localPart.slice(-2);
  return `${maskedLocalPart}@${domain}`;
}

function resAllUser(list) {
  return list.map(
    ({ idUser, idLevel, nameLevel, nameUser, lastNameUser, emailUser }) => ({
      idUser,
      idLevel,
      nameLevel,
      nameUser,
      lastNameUser,
      emailUser: encryEmail(emailUser),
    })
  );
}

const hashedPassword = async (password) => await bcrypt.hash(password, 10);

module.exports = { resAllUser, hashedPassword };
