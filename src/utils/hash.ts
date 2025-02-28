import { hashSync, genSaltSync, compareSync } from "bcrypt";

function createHash (password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt)
  return hash
}

function compareHash (reqPass: string, dbPass: string) {
  const compare = compareSync(reqPass, dbPass);
  return compare
}

export {createHash, compareHash}