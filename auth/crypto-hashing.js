import * as Crypto from "expo-crypto";

export default async function runCrypto(pass) {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    pass
  );
  return digest;
}
