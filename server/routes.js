const express = require("express");
const fs = require("fs");
const util = require("util");
const path = require("path");
const archiver = require("archiver");
const unzip = require("unzip");

const config = require("./config");
const CONSTANTS = require("./constants");

const router = express.Router();

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const getFilePath = async (dir, file) => {
  const files = await readdir(dir);

  return path.join(
    dir,
    files.find(f => path.parse(path.join(dir, f)).name === file)
  );
};

const unzipSetups = files => {
  const map = files.map(file => {
    return new Promise((resolve, reject) => {
      try {
        if (file.filePath.indexOf("_setup.zip") === -1) {
          resolve(file);
          return;
        }

        const newDirPath = path.join(
          CONSTANTS.TEMP_DIR,
          Math.random().toString()
        );
        const newFilePath =
          path.join(newDirPath, path.parse(file.filePath).name) + ".exe";

        fs
          .createReadStream(file.filePath)
          .pipe(unzip.Extract({ path: newDirPath }))
          .on("close", () => {
            resolve({ fileName: file.fileName, filePath: newFilePath });
          });
      } catch (err) {
        reject(err);
      }
    });
  });

  return Promise.all(map);
};

const zipFiles = files => {
  const archive = archiver("zip", {
    zlib: { level: 9 }
  });

  archive.on("warning", function(err) {
    if (err.code === "ENOENT") {
      throw err;
    } else {
      throw err;
    }
  });

  archive.on("error", function(err) {
    throw err;
  });

  files.map(m =>
    archive.file(m.filePath, {
      name: `${m.fileName}${path.parse(m.filePath).ext}`
    })
  );

  // archive.pipe(output);
  return archive;
};

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
            .filter(f => f !== ".DS_Store")
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
        filePath: await getFilePath(
          path.join(releasesFolder, m.name),
          m.version
        )
      }))
    );

    const unzipFiles = await unzipSetups(files);

    const archive = zipFiles(unzipFiles);

    archive.pipe(res);
    archive.finalize();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
