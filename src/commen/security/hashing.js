import { hash, compare } from "bcrypt";
import { SALT_ROUNDS } from "../../config/config.js";

export async function hashValue(value, saltRounds = SALT_ROUNDS) {
  return await hash(value, saltRounds);
}

export async function compareValue(value, hashedValue) {
  return await compare(value, hashedValue);
}
