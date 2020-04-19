import bigInt, { BigInteger, randBetween } from 'big-integer'
import forge from 'node-forge'

import { RANDOM_FACTOR_MAX_INPUTS } from './constants'

export type PublicKey = forge.pki.rsa.PublicKey

export type RsaClientOptions = {
  readonly publicKey: PublicKey
}

type RandomFactors = {
  readonly rInv: BigInteger
  readonly rPrime: BigInteger
}

type DataStructure = {
  readonly add: (element: string) => void
  readonly has: (element: string) => boolean
}

export type RsaClient = {
  readonly genRandomFactors: (maxInputs: number) => readonly RandomFactors[]
  readonly blind: (y: BigInteger, randomFactor: RandomFactors) => BigInteger
  readonly blindMany: (
    Y: readonly BigInteger[],
    randomFactors: readonly RandomFactors[]
  ) => readonly BigInteger[]
  readonly intersect: (
    Y: readonly BigInteger[],
    B: readonly BigInteger[],
    randomFactors: readonly RandomFactors[],
    dataStructure: DataStructure
  ) => readonly BigInteger[]
}

export type RsaClientInitializer = (options: RsaClientOptions) => RsaClient

const client: RsaClientInitializer = ({ publicKey }) => {
  const keys = {
    publicKey
  }

  /**
   * Generate an iterable of random factors
   * @param maxInputs Maximum number of inputs the server can accept
   * @returns An iterable of random factors
   */
  const genRandomFactors = (
    maxInputs = RANDOM_FACTOR_MAX_INPUTS
  ): readonly RandomFactors[] => {
    return Array.from({
      length: maxInputs
    }).map(() => {
      const n = BigInt(keys.publicKey.n)
      const e = BigInt(keys.publicKey.e)
      // TODO: ensure this is a CSPRNG
      const r = randBetween(0, n)
      // r^-1 mod n
      const rInv = r.modInv(n)
      // r^e mod n
      const rPrime = r.modPow(e, n)
      return { rInv, rPrime }
    })
  }

  /**
   * Creates a blind value
   * @param y Client value to blind
   * @param randomFactor A random factor
   */
  const blind = (y: BigInteger, randomFactor: RandomFactors): BigInteger => {
    const n = bigInt(keys.publicKey.n.toString())
    const { rPrime } = randomFactor
    return y.multiply(rPrime).mod(n)
  }

  /**
   * Creates blind values over a pair of iterables
   * @param Y An iterable of client values to blind
   * @param randomFactors  An iterable of random factors
   */
  const blindMany = (
    Y: readonly BigInteger[],
    randomFactors: readonly RandomFactors[]
  ): readonly BigInteger[] => {
    const n = bigInt(keys.publicKey.n.toString())
    return Y.map(
      (y: BigInteger, i: number): BigInteger => {
        const { rPrime } = randomFactors[i]
        // y * r' mod n
        return y.multiply(rPrime).mod(n)
      }
    )
  }

  /**
   * Finds the intersection between an array of values from a client and server
   * @param Y An iterable of client values
   * @param B An iterable of signed blinds from the server
   * @param randomFactors An iterable of random factors
   * @param dataStructure A data structure implementation from the server
   */
  const intersect = (
    Y: readonly BigInteger[],
    B: readonly BigInteger[],
    randomFactors: readonly RandomFactors[],
    dataStructure: DataStructure
  ): readonly BigInteger[] => {
    const n = BigInt(keys.publicKey.n)
    return B.reduce((acc: BigInteger[], b: BigInteger, i: number) => {
      const { rInv } = randomFactors[i]
      // b * rInv mod n
      const toCheck = b.multiply(rInv).mod(n).toString()
      if (dataStructure.has(toCheck)) {
        acc.push(Y[i])
      }
      return acc
    }, [])
  }

  return {
    genRandomFactors,
    blind,
    blindMany,
    intersect
  }
}

export default client
