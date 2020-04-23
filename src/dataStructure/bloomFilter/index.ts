import bigInt from 'big-integer'
import BitArray from 'node-bitarray'
import forge from 'node-forge'
import { MAX_ELEMENTS, FALSE_POSITIVE_PROBABILITY } from '../constants'

export type BloomFilter = {
  readonly add: (element: string) => void
  readonly has: (element: string) => boolean
}

export type BloomFilterDataStructure = {
  readonly create: (
    capacity: number,
    falsePositiveProbability: number
  ) => BloomFilter
  readonly from: (
    items: readonly string[],
    falsePositiveProbability: number
  ) => BloomFilter
}

const { sha256 } = forge.md

const NONCES: readonly [number, number] = [1, 2]

const getBitLength = (
  capacity: number,
  falsePositiveProbability: number
): number => {
  const bitLength = Math.ceil(
    (-capacity * Math.log2(falsePositiveProbability)) / Math.log(2)
  )
  // We may as well use a whole number of bytes
  return Math.ceil(bitLength / 8) * 8
}

const getHash = (element: string, bitLength: number, nonce: number): number => {
  const hashObject = sha256.create()
  hashObject.update(
    Buffer.concat([
      Buffer.from([nonce]),
      Buffer.from(element, 'latin1')
    ]).toString('latin1')
  )
  const rawHash = hashObject.digest().toHex()
  const bigIntHash = bigInt(rawHash, 16)
  // Non-uniformity is negligible for Bloom filters of reasonable size
  return bigIntHash.mod(bitLength).toJSNumber()
}

const bloomFilter: BloomFilterDataStructure = {
  create: (
    capacity = MAX_ELEMENTS,
    falsePositiveProbability = FALSE_POSITIVE_PROBABILITY
  ) => {
    let count = 0
    const bitLength = getBitLength(capacity, falsePositiveProbability)
    const bitArray = BitArray.factory(0, bitLength)
    const numHashFunctions = Math.ceil(-Math.log2(falsePositiveProbability))

    const getHashes = (element: string): readonly number[] => {
      const [h1, h2] = NONCES.map(getHash.bind(null, element, bitLength))
      return [...new Array(numHashFunctions)].map(
        (_, i) => h1 + ((i * h2) % bitLength)
      )
    }

    const add = (element: string): void => {
      if (count >= capacity) {
        throw new Error('Bloom filter is at maximum capacity')
      }

      const hashes = getHashes(element)
      hashes.forEach(i => bitArray.set(i, 1))

      ++count
    }

    const has = (element: string): boolean => {
      const hashes = getHashes(element)
      for (const i of hashes) {
        if (!bitArray.get(i)) {
          return false
        }
      }
      return true
    }

    return {
      add,
      has
    }
  },
  from: (
    items,
    capacity = items.length,
    falsePositiveProbability = FALSE_POSITIVE_PROBABILITY
  ) => {
    const filter = bloomFilter.create(capacity, falsePositiveProbability)
    items.forEach(filter.add)
    return filter
  }
}

export default bloomFilter
