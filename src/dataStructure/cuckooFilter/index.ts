import { CuckooFilter } from 'bloom-filters'
import {
  MAX_ELEMENTS,
  FALSE_POSITIVE_PROBABILITY,
  BUCKET_SIZE,
  MAX_KICKS
} from '../constants'

export type CuckooFilterDataStructure = {
  readonly create: (
    capacity: number,
    falsePositiveProbability: number,
    bucketSize?: number,
    maxKicks?: number
  ) => CuckooFilter
  readonly from: (
    items: Iterable<string>,
    falsePositiveProbability: number,
    bucketSize?: number,
    maxKicks?: number
  ) => CuckooFilter
}

const cuckooFilter: CuckooFilterDataStructure = {
  create: (
    capacity = MAX_ELEMENTS,
    falsePositiveProbability = FALSE_POSITIVE_PROBABILITY,
    bucketSize = BUCKET_SIZE,
    maxKicks = MAX_KICKS
  ) =>
    CuckooFilter.create(
      capacity,
      falsePositiveProbability,
      bucketSize,
      maxKicks
    ),
  from: (
    items,
    falsePositiveProbability = FALSE_POSITIVE_PROBABILITY,
    bucketSize = BUCKET_SIZE,
    maxKicks = MAX_KICKS
  ) => CuckooFilter.from(items, falsePositiveProbability, bucketSize, maxKicks)
}

export default cuckooFilter
