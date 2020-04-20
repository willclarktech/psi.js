import bloomFilter, { BloomFilterDataStructure } from './bloomFilter'
import cuckooFilter, { CuckooFilterDataStructure } from './cuckooFilter'

export type DataStructure = {
  readonly bloomFilter: BloomFilterDataStructure
  readonly cuckooFilter: CuckooFilterDataStructure
}

const dataStructure: DataStructure = {
  bloomFilter,
  cuckooFilter
}

export default dataStructure
