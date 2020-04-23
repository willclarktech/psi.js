import { BloomFilter } from 'bloom-filters'
import { MAX_ELEMENTS, FALSE_POSITIVE_PROBABILITY } from '../constants'

export type BloomFilterDataStructure = {
  readonly create: (
    capacity: number,
    falsePositiveProbability: number
  ) => BloomFilter
  readonly from: (
    items: Iterable<string>,
    falsePositiveProbability: number
  ) => BloomFilter
}

const bloomFilter: BloomFilterDataStructure = {
  create: (
    capacity = MAX_ELEMENTS,
    falsePositiveProbability = FALSE_POSITIVE_PROBABILITY
  ) => BloomFilter.create(capacity, falsePositiveProbability),
  from: (items, falsePositiveProbability = FALSE_POSITIVE_PROBABILITY) =>
    BloomFilter.from(items, falsePositiveProbability)
}

export default bloomFilter
