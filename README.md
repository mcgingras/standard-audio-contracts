# CryptoCassettes
Because who doesn’t want a mixtape on the blockchain.

NFT Mixtapes are an experiment in NFTs, the intrinsic value of digitally scarce goods, and absolutely useless (but fun!) things on the internet. There’s really no point in owning a mixtape on the blockchain but then again is there anypoint in owning a 20x20 pixel “cryptopunk” either? This is art, thank you very much.

CryptoCasettes are ERC-721 crypto-collectibles on the Ethereum blockchain. Unlike most ERC-721 collectibles that are relatively static “art” pieces, CryptoCasettes aim to bring a bit of dynamism into the mix through the playable nature of the mixtapes.

### Stack
- [Hardhat](https://hardhat.org/)
- [Ethers](https://docs.ethers.io/v5/)
- [Hardhat Hackathon Boilerplate](https://github.com/nomiclabs/hardhat-hackathon-boilerplate)
- [Tailwind](https://tailwindcss.com)
- Helps to have Metamask installed.

### Todo
- Improve tokenURI metadata to include song links, mixtape title, possibly artwork.
    - Change the form to include these fields.
- How to actually buy mixtape NFT?
- Improve test coverage.
- Obvious some style changes.
- Nonce issue?
- Properties of mixtapes? Max # of songs - visuals, etc... how to make them different

### Questions
- Do we want the song urls to be spotify or soundcloud?
    - **Spotify:**
    Spotify API fairly easy to use. People value spotify playlists a lot more. Could be interesting to make it so whoever is the owner of the NFT can add songs to the playlist (increasing it's value perhaps, you could make the really contrived argument that a certain NFT playlist is really popular on spotify so a musician bids on it so they can add their own songs for publicity.)
    - **Soundcloud:**
    Can play full songs from soundcloud links (Spotify is just 30 second preview) so an in browser "listening room" where you could load your NFT mixtapes and listen to them could work out better with soundcloud vs spotify.
- Harberger Tax on NFT? If you want to be the one to own it and add songs you have to continuously pay tax.

### FAQs
- _Why am I doing this?_
It doesn't seem like anyone has minted playlists as NFTs yet, so it seems like an amusing and interesting way to learn a bit more about NFTS.

### Quick Start
start up a hardhat test node
```
npm install
npx hardhat node
```
new terminal tab to deploy the contract
```
npx hardhat run scripts/deploy.js --network localhost
```
new terminal tab to start spotify server
```
cd spotify_api
npm install
node server.js
```

new terminal tab to start front end. (needs to be port 3002)
```
cd frontend
npm install
npm start
```

oh also you probably need all my API keys so text me about that -mg

dont make them casettes make it radio stations
