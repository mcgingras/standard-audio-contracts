const { bufferToHex, keccak256 } = require('ethereumjs-util');

class MerkleTree {
  constructor(elements) {
    this.elements = [...elements]
    this.elements.sort(Buffer.compare)
    this.elements = this.bufDedup(this.elements)

    // returns a map of
    // element hash => index in element array
    this.bufferElementPositionIndex = this.elements.reduce((memo, el, index) => {
      memo[bufferToHex(el)] = index
      return memo
    }, {})

    // Create layers
    this.layers = this.getLayers(this.elements)
  }

  // builds up the layers of the merkle tree starting from the leave nodes
  // ex:
  // [1,2,3,4]
  // [[1,2,3,4], [12,34], [1234]]
  getLayers(elements) {
    if (elements.length === 0) {
      throw new Error('empty tree')
    }

    const layers = []
    layers.push(elements)

    // Get next layer until we reach the root
    while (layers[layers.length - 1].length > 1) {
      layers.push(this.getNextLayer(layers[layers.length - 1]))
    }

    return layers
  }

  // builds the "next layer"
  // of the merkle tree by accepting the previous layer
  // and combining adjacent leaves
  getNextLayer(elements) {
    return elements.reduce((layer, el, idx, arr) => {
      if (idx % 2 === 0) {
        // Hash the current element with its pair element
        layer.push(this.combinedHash(el, arr[idx + 1]))
      }

      return layer
    }, [])
  }

  // used in getNextLayer to combine adjacent leaves
  combinedHash(first, second) {
    if (!first) {
      return second
    }
    if (!second) {
      return first
    }

    return keccak256(this.sortAndConcat(first, second))
  }

  getRoot() {
    return this.layers[this.layers.length - 1][0]
  }

  getHexRoot() {
    return bufferToHex(this.getRoot())
  }

  getProof(el) {
    let idx = this.bufferElementPositionIndex[bufferToHex(el)]

    if (typeof idx !== 'number') {
      throw new Error('Element does not exist in Merkle tree')
    }

    return this.layers.reduce((proof, layer) => {
      const pairElement = this.getPairElement(idx, layer)

      if (pairElement) {
        proof.push(pairElement)
      }

      idx = Math.floor(idx / 2)

      return proof
    }, [])
  }

  getHexProof(el) {
    const proof = this.getProof(el)

    return this.bufArrToHexArr(proof)
  }

  getPairElement(idx, layer) {
    const pairIdx = idx % 2 === 0 ? idx + 1 : idx - 1

    if (pairIdx < layer.length) {
      return layer[pairIdx]
    } else {
      return null
    }
  }

  // removing duplicates from the buffer, which I guess is not allowed?
  // look into why duplicates are not allowed in a merkle tree...
  // from what I can find online it does not seem like duplicates matter
  // maybe this was just a strange edge case from uniswap
  bufDedup(elements) {
    return elements.filter((el, idx) => {
      return idx === 0 || !elements[idx - 1].equals(el)
    })
  }

  bufArrToHexArr(arr) {
    if (arr.some((el) => !Buffer.isBuffer(el))) {
      throw new Error('Array is not an array of buffers')
    }

    return arr.map((el) => '0x' + el.toString('hex'))
  }

  sortAndConcat(...args) {
    return Buffer.concat([...args].sort(Buffer.compare))
  }
}

module.exports = { MerkleTree }