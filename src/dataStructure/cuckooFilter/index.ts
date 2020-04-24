import { CuckooFilter } from 'bloom-filters'
import {
  DataStructureCreator,
  MAX_ELEMENTS,
  FALSE_POSITIVE_PROBABILITY,
  BUCKET_SIZE,
  MAX_KICKS
} from '../constants'

const cuckooFilter: DataStructureCreator = {
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
