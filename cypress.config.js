const { defineConfig } = require("cypress");

const fs = require('fs')
module.exports = {
  projectId: "9d3nnm",
  key: "afc99ad5-3608-4322-8242-4c055c7f0433"
  // ...rest of the Cypress project config
}
module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  viewportWidth: 1200,
  viewportHeight: 800,
  "scrollBehavior": false,

  e2e: {
    setupNodeEvents(on, config) {
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed')
          )
          if (!failures) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video)
          }
        }
      })
    },
  },
})
