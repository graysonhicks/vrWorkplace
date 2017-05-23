# vrWorkplace

## A Simple VR App To Explore Different Work Environments

## Use
- Choose a workplace from the main menu
- discover 'hotpoints' around workplace and click to learn more

### For deployment

- on `master` branch, `npm run bundle` to build prod bundles in `/build` folder
- the `static_assets/` folder must be copied down in `build/` folder
- `index.html` is not built by this command, so existing `vr/index.html` must be placed down in `/build` folder
- now paths must be changed in the `build/index.html` file to point to the prod bundles instead of dev js
- `<script src="./client.bundle?platform=vr"></script>` becomes `<script src="./client.bundle.js?platform=vr"></script>`
- `ReactVR.init('../index.vr.bundle?platform=vr&dev=true',document.body);` becomes `ReactVR.init('./index.bundle.js?platform=vr', document.body);`
- now will use the the `gh-pages` package to deploy
- run `npm run deploy` it looks like this `"deploy": "gh-pages -d vr/build"` in the `package.json`
- `gh-pages` also requires the "homepage" to be set in `package.json`, it will look like this: `"homepage": "https://graysonhicks.github.io/vrWorkplace"`
- now run `npm run deploy`
- you should not have to checkout/merge/alter on the gh-pages directly as long as this process is done correctly, otherwise can cause failures

### To Do
- ~~inital loading animation~~
- ~~loading animation for pano image changes~~
- ~~make welcome text its own Component, `<Welcome />`~~
- ~~fade `<Welcome />` in and out on page load, remove from click events~~
- ~~`<Homepage />` component to hold and animate `<Welcome />` and `<Menu />`~~
- animate main menu slide over when leaving homepage
- home button to return to main menu from scene
- ~~new main menu pano~~
- maybe keep pano in state
- ~~close icon on panel to toggle~~
- ~~animate hotpoints on hover (use Animate like this: https://www.sitepoint.com/building-a-full-sphere-3d-image-gallery-with-react-vr/)~~
- ~~menu jump on hotpoint click bug~~
- set correct rotations on hotpoints
- ~~set translates on hotpoints to be equidistant from perspective~~
- ~~show info panel on hotpoints click~~
- ~~refactor buttons and hotpoints to individual component files~~
