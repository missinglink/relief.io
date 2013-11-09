Hack4Good--Typhoon-Haiyan
=========================

Repo for ideas, data, and code to help with disaster relief.

Currently links to Disaster Relief Apps are stored in links.json.

## Setting up for development

Note: you will need `node` and `npm` installed first.

The easiest way to install `node.js` is with [nave.sh](https://github.com/isaacs/nave) by executing `[sudo] ./nave.sh usemain 0.10`

Clone the repo, enter the directory and type:

```bash
$ npm install

$ [sudo] npm install bower -g
$ bower install

$ npm start
```

You should now be able to access the server here: `http://localhost:3000/`

## Project Structure

### Backend

- All server files live in the `/server` directory.
- Controllers live in the `/server/controllers` directory.
- General app config lives in the `/server/app.js` file.

### Backend Dependencies

- Try to use npm where possible, record dependencies in `package.json` or use the `--save` flag with `npm`

### Frontend

- All frontend files live in the `/public` directory.
- Angularjs components are split up in to `features` in the `/public/features` dirctory.
- Inside each feature can be controllers, services, styles and views related to that specific feature.
- Each feature may include an `init.js` file to initialize routes and services.
- Genenic styles & services can live in `/public/style` & `/public/services.js`.
- The main angular app config lives in `/public/app.js`
- The layout file is rendered in jade and passes session and user info from the backend to the frontend. This lives in `/public/index.jade`

### Frontend Dependencies

- Try to use bower where possible, record dependencies in `bower.json` or use the `--save` flag with `bower`
- Other 3rd party code can live in `/public/vendor`.