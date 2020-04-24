export type DataStructure = {
  readonly add: (element: string) => void
  readonly has: (element: string) => boolean
}

export type DataStructureCreator = {
  readonly create: (
    capacity: number,
    falsePositiveProbability: number
  ) => DataStructure
  readonly from: (
    items: readonly string[],
    falsePositiveProbability: number
  ) => DataStructure
}

export const MAX_ELEMENTS = 1024
export const FALSE_POSITIVE_PROBABILITY = 0.001
export const BUCKET_SIZE = 4
export const MAX_KICKS = 1
