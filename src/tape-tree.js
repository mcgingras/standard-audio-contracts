const { MerkleTree } = require('./merkle-tree.js')
const { utils } = require('ethers')

class TapeTree {
  constructor(balances) {
    this.tree = new MerkleTree(
      balances.map(({ capacity, quality, style }, index) => {
        return this.toNode(index, capacity, quality, style)
      })
    )
  }

  verifyProof(
    index,
    capacity,
    quality,
    style,
    proof,
    root
  ) {
    let pair = this.toNode(index, capacity, quality, style)
    for (const item of proof) {
      pair = MerkleTree.combinedHash(pair, item)
    }

    return pair.equals(root)
  }


  toNode(index, capacity, quality, style) {
    return Buffer.from(
      utils.solidityKeccak256(['uint256', 'uint8', 'uint8', 'uint256'], [index, capacity, quality, style]).substr(2),
      'hex'
    )
  }

  getHexRoot() {
    return this.tree.getHexRoot()
  }

  // returns the hex bytes32 values of the proof
  getProof(index, capacity, quality, style) {
    return this.tree.getHexProof(this.toNode(index, capacity, quality, style))
  }
}

module.exports = { TapeTree }