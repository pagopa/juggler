# The Juggler

> :warning: **This project is still a WIP and may change drastically**: Be very careful here!

Are you looking for a quick way to mock some endpoints given an open API? The Juggler can do what you are looking for.

## Minimum requirements

* npm cli (v7 or later)
* node (v18.13.0)

## How to run the juggler locally

Install all the dependencies with the following command:

``` sh
npm install
```

Generate the code required to run the application:

``` sh
npm run generate
```

Exec the following command to spin up the juggler:

``` sh
npm run start
```

## Useful commands

This project uses [npm workspaces feature](https://docs.npmjs.com/cli/v9/using-npm/workspaces?v=true).

To install a dependencies on a single package use the following command:

``` sh
# install fp-ts on core package
npm i -D fp-ts -w ./packages/core

# in general you can use the following syntax to run a command on a single package
npm run compile -w ./packages/core
```

To execute a script on all workspaces you can use the following format:

``` sh
# Excecute npm test in all workspaces
$ npm run compile --ws
```

