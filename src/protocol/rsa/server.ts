import bigInt, { BigInteger } from 'big-integer'
import forge from 'node-forge'

import { EXPONENT, KEY_SIZE } from './constants'

type PublicKey = forge.pki.rsa.PublicKey
type PrivateKey = forge.pki.rsa.PrivateKey
type KeyPair = forge.pki.rsa.KeyPair

export type RsaServerOptions = {
  readonly keySize: number
  readonly exponent: number
  readonly publicKey?: PublicKey
  readonly privateKey?: PrivateKey
}

export type RsaServer = {
  readonly sign: (a: BigInteger) => BigInteger
  readonly signMany: (A: readonly BigInteger[]) => readonly BigInteger[]
  readonly keys: KeyPair
}

export type RsaServerInitializer = (options: RsaServerOptions) => RsaServer

const getKeys = (
  keySize: number,
  exponent: number,
  privateKey?: PrivateKey,
  publicKey?: PublicKey
): KeyPair => {
  if (!privateKey) {
    return forge.pki.rsa.generateKeyPair.call(forge, {
      bits: keySize,
      e: exponent
    })
  }
  if (!publicKey) {
    return {
      publicKey: forge.pki.rsa.setPublicKey.call(
        forge,
        privateKey.n,
        privateKey.e
      ),
      privateKey
    }
  }
  return {
    publicKey,
    privateKey
  }
}

const server: RsaServerInitializer = ({
  keySize = KEY_SIZE,
  exponent = EXPONENT,
  privateKey,
  publicKey
}) => {
  const keys = getKeys(keySize, exponent, privateKey, publicKey)

  /**
   * Signs a value with the RSA private key
   * @param a - A value to sign
   * @returns A signed value
   */
  const sign = (a: BigInteger): BigInteger => {
    const d = bigInt(keys.privateKey.d.toString())
    const n = bigInt(keys.privateKey.n.toString())
    // a^d mod n
    return a.modPow(d, n)
  }

  /**
   * Signs many values with the RSA private key
   * @param A An iterable of values to sign
   * @returns An iterable of signed values
   */
  const signMany = (A: readonly BigInteger[]): readonly BigInteger[] => {
    const d = bigInt(keys.privateKey.d.toString())
    const n = bigInt(keys.privateKey.n.toString())
    // a^d mod n
    return A.map((a: BigInteger) => a.modPow(d, n))
  }

  return {
    keys,
    sign,
    signMany
  }
}

export default server
