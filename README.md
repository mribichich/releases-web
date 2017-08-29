# releases-web

## Configuration

### Env Vars

- PORT
- RELEASES_PATH

## Development

### `yarn start` and `yarn start:server`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Releases Folder

Each product releases should be in a separate folder with the products name. 
Each folder should contain the different versions, following the next format:

`{versionNumber}_{typeOfRelease}`

Ej:
- 1.2.3_setup.exe
- 1.0.123_binaries.zip