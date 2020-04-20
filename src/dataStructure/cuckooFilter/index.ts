import { CuckooFilter } from 'bloom-filters'
import { MAX_ELEMENTS, ERROR_RATE, BUCKET_SIZE, MAX_KICKS } from '../constants'

export type CuckooFilterDataStructure = {
  readonly create: (
    size: number,
    errorRate: number,
    bucketSize?: number,
    maxKicks?: number
  ) => CuckooFilter
  readonly from: (
    items: Iterable<string>,
    errorRate: number,
    bucketSize?: number,
    maxKicks?: number
  ) => CuckooFilter
}

const cuckooFilter: CuckooFilterDataStructure = {
  create: (
    size = MAX_ELEMENTS,
    errorRate = ERROR_RATE,
    bucketSize = BUCKET_SIZE,
    maxKicks = MAX_KICKS
  ) => CuckooFilter.create(size, errorRate, bucketSize, maxKicks),
  from: (
    items,
    errorRate = ERROR_RATE,
    bucketSize = BUCKET_SIZE,
    maxKicks = MAX_KICKS
  ) => CuckooFilter.from(items, errorRate, bucketSize, maxKicks)
}

export default cuckooFilter
