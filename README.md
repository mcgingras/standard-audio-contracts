# CryptoCassettes
Because who doesn’t want a mixtape on the blockchain.

[Read More](https://docs.google.com/document/d/1dLMGF05rfyAeyf8dHteo8na3bnuXJT_EBJ5eLTB7e-4/edit)

### Stack
- [Hardhat](https://hardhat.org/)
- [Ethers](https://docs.ethers.io/v5/)
- [Hardhat Hackathon Boilerplate](https://github.com/nomiclabs/hardhat-hackathon-boilerplate)
- [Tailwind](https://tailwindcss.com)
- Helps to have Metamask installed.


### Quick Start
start up a hardhat test node
```
npm install
npx hardhat node
```
new terminal tab to deploy the contract
```
npx hardhat compile
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
