const scenario = isTest && require(`./full.json`)

exports.addTestAnswers = (metalsmith, options, helpers) => {
  Object.assign(
    metalsmith.metadata(),
    { isNotTest: true },
    scenario
  )
}