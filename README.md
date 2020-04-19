# psi.js
A JavaScript library for private set intersection

## Installation
TODO - Build an npm dist with webpack

Clone the repository, then run the following:

`yarn build`
`yarn demo:rsa`

## Examples

The folder [examples](./examples) contains a local client <-> server interaction of each protocol. A true
end-to-end demo would require a transport layer implementation which these examples omit.

Extensive comments inside each of the examples will illustrate how a e2e implementation would look like.
Run a specific example, such as `examples/rsa.js`, using `yarn demo:rsa`.

### RSA
Demonstrates RSA Blind Signature-based PSI as described in this [paper](https://encrypto.de/papers/KLSAP17.pdf).
Inspiration from [Python implementation](https://github.com/youben11/PSI).

### DH
TODO - Define DH-PSI

### Paillier
TODO - Define Paillier-PSI

### SEAL
TODO- Define SEAL-PSI

## Contributing

Additional implementations will reside under the `protocol` namespace, likewise a new data-structure will reside
 under the `dataStructure` namespace.

```
psi . protocol . rsa
 `        `        `-- implementation (rsa, dh, etc.)
  `        `-- layer namespace (ex: protocol, datastructure, etc.)
   `-- our library name

psi . dataStructure . bloomFilter
 `          `              `-- implementation (bloomFilter, cuckooFilter, etc.)
  `          `-- layer namespace (ex: protocol, dataStructure, etc.)
   `-- our library name
```

