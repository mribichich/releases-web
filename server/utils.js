const archiver = require("archiver");
const unzip = require("unzip");
const util = require("util");
const fs = require("fs");
const path = require("path");

const CONSTANTS = require("./constants");

const readdir = util.promisify(fs.readdir);

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

module.exports = {
  getFilePath,
  unzipSetups,
  zipFiles
};
