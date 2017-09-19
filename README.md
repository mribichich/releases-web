# releases-web

## Configuration

### Env Vars

- PORT
- RELEASES_PATH

## Development

### Start frontend and backend

```bash
yarn start
yarn start:server
```

### Testing

```bash
yarn test
```

## Production

### Build frontend

```bash
yarn run build
```

### Start server

```bash
yarn start:server
```

## Releases Folder

Each product releases should be in a separate folder with the products name. 
Each folder should contain the different versions, following the next format:

`{versionNumber}_{typeOfRelease}`

Ej:
- 1.2.3_setup.exe
- 1.0.123_binaries.zip