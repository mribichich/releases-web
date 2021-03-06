const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");

const config = require("./config");
const CONSTANTS = require("./constants");
const utils = require("./utils");

const router = express.Router();

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

router.get("/applications", async (req, res) => {
  try {
    const dirs = await readdir(config.releasesPath);

    const isDirectory = dir => {
      const stats = fs.statSync(dir);

      return stats.isDirectory();
    };

    const filteredDirs = dirs.filter(f =>
      isDirectory(path.join(config.releasesPath, f))
    );

    const apps = await Promise.all(
      filteredDirs.map(async m => {
        const appDir = path.join(config.releasesPath, m);

        const versions = await readdir(appDir);

        return {
          name: m,
          versions: versions
            .filter(f =>
              [".DS_Store", "explorer", "desktop"].every(s => s !== f)
            )
            .map(m => path.parse(path.join(appDir, m)).name)
        };
      })
    );

    res.json(apps);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/applications/download", async (req, res) => {
  try {
    const files = await Promise.all(
      req.body.map(async m => ({
        fileName: `${m.name}_${m.version}`,
        filePath: await utils.getFilePath(
          path.join(config.releasesPath, m.name),
          m.version
        )
      }))
    );

    const unzipFiles = await utils.unzipSetups(files);

    const archive = utils.zipFiles(unzipFiles);

    res.attachment("releases.zip");

    archive.pipe(res);
    archive.finalize();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
