import crypto from "crypto";

const ALGORITHM = "aes-256-ecb";

function getKey() {
  const key = process.env.ENCRYPTION_KEY_NO_IV;
  if (!key) {
    throw new Error("ENCRYPTION_KEY missing");
  }
  const buffer = Buffer.from(key, "hex");
  if (buffer.length !== 32) {
    throw new Error("Invalid encryption key length");
  }
  return buffer;
}

export function encrypt(text) {
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    getKey(),
    null
  );
  let encrypted = cipher.update(
    text,
    "utf8",
    "base64"
  );
  encrypted += cipher.final("base64");
  return encrypted;
}

export function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    getKey(),
    null
  );
  let decrypted = decipher.update(
    encryptedText,
    "base64",
    "utf8"
  );
  decrypted += decipher.final("utf8");
  return decrypted;
}
