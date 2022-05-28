# VMTree Web Admin App
This dapp will go on to become the analytics and management dashboard for VMTrees.

# Built with Moralis
This dapp was built using Moralis, which will be a good decision for us in the future when VMTree spans multiple chains.

We follow a simple general pattern for using Moralis for read/write capability with the blockchain.

## Read
We use the `useApiContract` hook imported from `react-moralis`. This hook can read data from the blockchain without a user-connected wallet, because it queries from the Moralis server. So we can display blockchain data before a user has connected their wallet to the dapp.
```js
// treats arborist contract as backend database
const getVMTreesOptions = {
    chain: "rinkeby",
    address: arboristAddress,
    functionName: "getVMTrees",
    abi: arboristAbi,
    params: {},
};
// useApiContract connects to moralis provider without needing user's wallet
// to be connected
const {
    runContractFunction,
    data,
    error,
    isLoading,
    isFetching,
} = useApiContract(getVMTreesOptions);
// get the tree data when the page loads
useEffect(() => {
    runContractFunction();
}, []);     // eslint-disable-line react-hooks/exhaustive-deps
```

## Connect to Wallet
We use the [web3uikit](https://moralis.io/web3ui-kit-the-ultimate-web3-user-interface-kit/)'s ConnectButton component to connect to the user's wallet. This component lives in the NavBar, and when the user is connected through the button, we can trigger transactions by retrieving the moralis connected wallet with the `useMoralis` hook imported from `react-moralis`. It is seemless to integrate multiple wallet options by using Moralis by using a simple component.
```js
<ConnectButton
    color="blue"
    moralisAuth={false}
    zIndex="2147483647"
/>
```

## Write
We use the `Moralis.executeFunction` function exposed from the `useMoralis` hook. This triggers a transaction that the user can sign or reject.

```js
// to make transactions, we need to be connected to the user's wallet.
// the useMoralis hook gets the account from the ConnectButton and gives us
// a class to make transactions with.
const { Moralis, isWeb3Enabled, account } = useMoralis();
// for each contract interaction that we can do with the VMTree, we want
// a pair of functionNameOptions and functionName objects to do the tx.
// then we add a form + button that calls the functionName
const topUpLinkOptions = () => ({
    chain: "rinkeby",
    address: arboristAddress,
    functionName: "topUpLink",
    abi: arboristAbi,
    params: { linkPayer, amount },
});
async function topUpLink() {
    try {
        const tx = await Moralis.executeFunction(topUpLinkOptions());
        const receipt = await tx.wait();
    } catch (err) {
        console.log(err);
    }
}
```

# Next.js Docs
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
