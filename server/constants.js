const os = require("os");
const path = require("path");

const TEMP_DIR = path.join(os.tmpdir(), "tss-downloads");

module.exports = {
  TEMP_DIR
};
