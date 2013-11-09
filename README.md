Hack4Good - Typhoon Haiyan
==========================

This is a repo for ideas, data, and code to help with disaster relief in the Philippines.

The app is built with `nodejs`+`angular`, uses `firebase` for the sockets & has some `mongodb` examples.

## Contributing to the project

Please help out where you can, I'm happy for this repo to be the base for a bunch of projects that can all live at http://relief.io or you are free to fork it and create another site.

Join in the chat here: https://www.hipchat.com/g9bBgsIwG

Hackathon page: https://geekli.st/hackathon/52793a2660fb3f52d50001f8

Please star the repo and spread the word on twitter.
https://twitter.com/insertcoffee/statuses/399232533910409216

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
- Angularjs components are split up in to `features` in the `/public/features` directory.
- Inside each feature can be controllers, services, styles and views related to that specific feature.
- Each feature may include an `init.js` file to initialize routes and services.
- Generic styles & services can live in `/public/style` & `/public/services.js`.
- The main angular app config lives in `/public/app.js`
- The layout file is rendered in jade and passes session and user info from the backend to the frontend. This lives in `/public/index.jade`

### Frontend Dependencies

- Try to use bower where possible, record dependencies in `bower.json` or use the `--save` flag with `bower`
- Other 3rd party code can live in `/public/vendor`.

## Developing a new feature

### Frontend

The frontend is built with `angularjs`, which is pretty simple if you have experience with a javascript MVC framework. `Jquery`, `underscore` & `Twitter Bootstrap` are also included.

- Create a new directory for the feature `/public/features/myfeature`. (it may be easier to copy an existing one)
- Modify `init.js` to set up your routes and rename the controllers etc.
- Edit `/public/app.jade` in the `// ========= Features =========` section to add your new feature. (it may be easier to copy an existing one)
- You can modify `/public/features/menu/menu.html` to add your new feature to the top menu.

### Adding information to a map

The mapping lib `leafletjs` is included and some example code can be found in the `map` feature directory. ( `leaflet` functions all start with `L.` )

- http://leafletjs.com/
- https://github.com/missinglink/relief.io/blob/master/public/feature/map/IndexController.js

### Backend

The backend is built with `nodejs`. If you have experience with `ruby` or `PHP` etc you should be fine copy->pasting to get you started. The server is based on `expressjs` & the sockets are using `firebase`.

- Create a new controller in `/server/controllers` or a service in `/server/services`. (it may be easier to copy an existing one)
- Edit `/server/app.js` in the `// Controllers` or `// Services` section to add your new feature. (it may be easier to copy an existing one)

## Some Phillipines geo data files can be found here:

https://github.com/coryarmbrecht/Hack4Good--Typhoon-Haiyan/tree/master/data/geo