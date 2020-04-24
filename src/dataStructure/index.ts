import bloomFilter from './bloomFilter'
import cuckooFilter from './cuckooFilter'
import { DataStructureCreator } from './constants'

export { DataStructure } from './constants'

export type DataStructureModule = {
  readonly bloomFilter: DataStructureCreator
  readonly cuckooFilter: DataStructureCreator
}

const dataStructure: DataStructureModule = {
  bloomFilter,
  cuckooFilter
}

export default dataStructure
