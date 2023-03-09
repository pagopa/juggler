# The Juggler

> :warning: **This project is still a WIP and may change drastically**: Be very careful here!

Are you looking for a quick way to mock some endpoints given an open API? The Juggler can do what you are looking for.

## How to run it

Install all the dependencies with the following command:

``` sh
npm install
```

Then, generate the Juggler code from its OpenAPI with the following command:

``` sh
npm run generate:api
```

To spin up the mock just run the following command:

``` sh
npm run start
```

You can access the dashboard by visiting the path `/ui/dashboard`.

If you want to take a look at an HTML version of the OpenAPI, you can visit the path `/ui/openapi`.
