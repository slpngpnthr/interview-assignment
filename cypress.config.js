const { defineConfig } = require("cypress");

const fs = require("fs");
module.exports = {
  // ...rest of the Cypress project config
};
module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  viewportWidth: 1200,
  viewportHeight: 800,
  scrollBehavior: false,
  projectId: "z256uu",
  key: "5a32a23f-b0e4-4303-a001-edd7dd3a44c7",
  env:{
    "browserPermissions": {
      "notifications": "allow",
      "geolocation": "allow",
      "camera": "block",
      "microphone": "block",
      "images": "allow",
      "javascript": "allow",
      "popups": "ask",
      "plugins": "ask",
      "cookies": "allow"
    }

  },

  e2e: {
    setupNodeEvents(on, config) {
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === "failed")
          );
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video);
          }
        }
      });
    },
  },
});
