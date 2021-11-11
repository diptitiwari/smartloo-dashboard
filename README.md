# Smart Loo

## Usage
To get up and running run:
``` bash
$ npm install
$ npm run serve
```
Yes, that's it. Only two commands!

If you still think that's too much effort, you could also run:
``` bash
$ npm i && npm run serve
```
But yeah, this will basically do the same as `npm install`.
If even this is too much of a deal, try creating an alias and bind `npm install && npm run serve` to `npmis`.

## Configuration ##
> Wait a minute, you just said that I only need to run npm install?
> What's this? I need to do more?

Yeah, to get up and running real quick, `npm install` is enough.
But if you want to, let's say, connect to an external API, there's a little bit more involved.
You need to configure your application a bit more, explained below:

### Environment variables ###
In the root of the boilerplate is a predefined environment file.
Copy the file and name it `.env` or a configuration specific file like `.env.dev`.
For more information, visit the [docs](https://github.com/vuejs/vue-cli/blob/dev/docs/env.md).

## What's included ##
- `npm run serve`: first-in-class development experience.
- `npm run build`: production ready build.
- `npm run unit`: start the Karma Test Runner.
- `npm run e2e`: start the Nightwatch Test Runner.
- `npm run lint`: lint the files using ESLint.