declare module 'node-bitarray' {
  export default class BitArray {
    public static factory(
      bits?: number | Uint32Array,
      length?: number,
      asOctet?: boolean
    ): BitArray

    public set(index: number, value: 0 | 1): BitArray

    public get(index: number): 0 | 1
  }
}
