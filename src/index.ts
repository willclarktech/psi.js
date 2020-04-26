import dataStructure, { DataStructureModule } from './dataStructure'
import protocol, { Protocol } from './protocol'

export type Psi = {
  readonly dataStructure: DataStructureModule
  readonly protocol: Protocol
}

const psi: Psi = {
  dataStructure,
  protocol
}

export default psi
