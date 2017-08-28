const config = {
  port: process.env.PORT || 5005,
  releasesPath: process.env.RELEASES_PATH
};

if (!config.releasesPath) {
  throw new Error("No releases path env var found");
}

module.exports = config;
