const CleanCSS = require('clean-css')
const { minify } = require('terser')

module.exports = function (eleventyConfig) {
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
  })

  eleventyConfig.addPassthroughCopy('solutions.json')
  eleventyConfig.addPassthroughCopy('pdf/*.pdf')

  eleventyConfig.addFilter('cssmin', function (code) {
    return new CleanCSS({}).minify(code).styles
  })

  eleventyConfig.addNunjucksAsyncFilter(
    'jsmin',
    async function (code, callback) {
      try {
        const output = await minify(code)
        callback(null, output.code)
      } catch (err) {
        console.error('Terser:', err)
        callback(null, code)
      }
    },
  )

  return {
    dir: {
      output: "docs"
    }
  }
}
