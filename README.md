[![npm version](https://badge.fury.io/js/@opweb3%2Fethcontracts.svg)](https://badge.fury.io/js/@opweb3%2Fethcontracts)
[![GitHub version](https://badge.fury.io/gh/ujjwalguptaofficial%2Fethcontracts.svg)](https://badge.fury.io/gh/ujjwalguptaofficial%2Fethcontracts)
[![CI](https://github.com/ujjwalguptaofficial/ethcontracts/actions/workflows/ci.yml/badge.svg)](https://github.com/ujjwalguptaofficial/ethcontracts/actions/workflows/ci.yml)
# ethcontracts
Readymade ethereum contracts implementation with support for all ethereum library. The contracts are created based on [openzeppelin](https://github.com/OpenZeppelin) standard.

# install

```
npm i @opweb3/ethcontracts
```

# Features

* Based on openzeppelin standard
* Supports for multiple ethers client - web3.js and ethers
* Extensible - you can extend and customize as per need
* Automatic ABI management
* Treeshakable (use only what's needed and others part won't be included in your code)
* Free and MIT License
* Strong typescript support

# Docs

## setup

You can use any ethereum library. Currently we support ethers and web3.js. You just have to provide appropriate client to the contract class.

### ethers

```
import { EthersClient } from "@opweb3/ethcontracts";
```

### web3js

```
import { Web3Client } from "@opweb3/ethcontracts";
```

## ERC20

The first step is to create the token instance with tokenAddress.

```
import { EthersClient, Web3Client, ERC20 } from "@opweb3/ethcontracts";

const token = new ERC20(<tokenAddress>);
```

### init

initiate token with provider.

#### ethers.js

```
await token.init(new EthersClient(<wallet provider>));
```

#### web3.js

```
await token.init(new Web3Client(<wallet provider>));
```

you can call init multiple times with different provider. This allows you to use the same token instance in multichain dapp.

### getName

getName returns the name of the token.

```
const tokenName = await token.getName();
```
### getDecimals

getDecimals returns the decimals of the token.

```
const tokenDecimal = await token.getDecimals();
```
### getSymbol

getSymbol returns the symbol of the token.

```
const symbol = await token.getSymbol();
```

### getBalance

getBalance returns the balance of a user.

```
const tokenBalance =  await token.getBalance(<userAddress>);
```

### getTotalSupply

getTotalSupply returns the total supply of the token.

```
const totalSupply = await token.getTotalSupply();
```
 
### getAllowance

getAllowance returns the allowance of a spender for a user.

```
const allowance = await token.getAllowance(<owner>, <spender>);
```

### approve

approve method approves the allowance of a spender for the current user.

```
const [getTransactionHash, getTransactionReceipt] = await token.approve(<spenderAddress>, <amount>);

const txhash = await getTransactionHash();
const txReceipt = await getTransactionReceipt();
```

### transfer

transfer method can be used to transfer amount to another user.

```
const [getTransactionHash, getTransactionReceipt] = await token.transfer(<toAddress>, <amount>);

const txhash = await getTransactionHash();
const txReceipt = await getTransactionReceipt();
```

### transferFrom

transfer method can be used to transfer amount to another user by a spender or owner.

```
const [getTransactionHash, getTransactionReceipt] = await token.transferFrom(<fromAddress>,<toAddress>, <amount>);

const txhash = await getTransactionHash();
const txReceipt = await getTransactionReceipt();
```

### increaseAllowance

increaseAllowance method can be used to increase the allowance of a spender.

```
const [getTransactionHash, getTransactionReceipt] = await token.increaseAllowance(<spenderAddress>, <amount>);

const txhash = await getTransactionHash();
const txReceipt = await getTransactionReceipt();
```

### decreaseAllowance

decreaseAllowance method can be used to decrease the allowance of a spender.

```
const [getTransactionHash, getTransactionReceipt] = await token.decreaseAllowance(<spenderAddress>, <amount>);

const txhash = await getTransactionHash();
const txReceipt = await getTransactionReceipt();
```
