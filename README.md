# psi.js
A Javascript library for private set intersection

We'd like to have a library where we could perform private set intersection over a variety of different approaches. The following features of this library are important to us:
- Support for Paillier HME
- Support for SEAL HME
- Identical API for any algorithm
- Complete interoperability with other OpenMined PSI libraries, allowing you to create keys in one language and use them in another

The following Paillier library seems most appropriate: https://github.com/OpenMined/paillier-pure
The following SEAL library seems most appropriate: https://github.com/morfix-io/node-seal

A sample API might look like such:

```js
import psi from 'psi.js/paillier';
// For SEAL, instead of Paillier: import psi from 'psi.js/seal';

const { publicKey, privateKey } = await psi.generateRandomKeys(3072);

let a = publicKey.encrypt(3);
let b = publicKey.enrypt(7);

let encryptedSum = publicKey.add(a, b);
let sum = privateKey.decrypt(encryptedSum); // 10

let encryptedProduct = publicKey.multiply(a, 6);
let product = privateKey.decrypt(encryptedSum); // 18
```
