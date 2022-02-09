# Basic DAO app

This is a simple demo to get people up and running with frontend development on The Internet Compputer.

Unlike the hello world provided by `dfx new` this site uses rollup and svelte for the frontend build.

## To run the app

#### Start the local replica

Open a new terminal window _in the project directory_, and run the following command to start the local replica. The replica will not start unless `dfx.json` exists in the current directory.

```
dfx start --background
```

When you're done with development, or you're switching to a different dfx project, running

```
dfx stop
```

from the project directory will stop the local replica.

#### Install Internet Identity

To use Internet Identity during development you need to have it running on your local replica. This repository includes it in a submodule.

To clone the II repository, run:

```
git submodule update --init --recursive
```

When the repository is cloned, switch to its directory and install it:

(If you're running this on an M1 Mac, make sure you follow [these steps]())

```
cd internet-identity
npm install
II_ENV=development dfx deploy --no-wallet --argument '(null)'
```

This will take several minutes to complete.

#### Build & run the dapp

Make sure you switch back to the project root directory.

First, install the frontend dependencies by running

```
cd src/dao_assets
npm install
cd ../..
```

To build and deploy the project run

```
dfx deploy --argument '(null)'
```

When the process completes you'll have a backend and a frontend canister running locally. To find the frontend canister's ID, run

```
dfx canister id dao_assets
```

It will output something similar to `rkp4c-7iaaa-aaaaa-aaaca-cai`. Copy this ID and open it in the browser using `http://localhost:8000?canisterId=<canister ID>`, eg. `http://localhost:8000?canisterId=rkp4c-7iaaa-aaaaa-aaaca-cai`.

## Local development

You can serve the frontend in development mode like you normally develop a svelte app using the command

```
npm run dev
```

from the project root directory, it is not necessary to deploy it to the frontend canister during development.

## To get test tokens

When you first use the app, the tokens will all be assigned to the principal you used when you deployed the app which is different to the one you get through Internet Identity. So you will need to send tokens from your dfx identity's principal to your Internet Identity principal.

You can find your principal by clicking on the 'UserId' tab.

To send tokens to your principal run the following command

```
dfx canister call dao transfer '(record { to=principal "<your principal>"; amount=record { amount_e8s=<amount> } })'
```
