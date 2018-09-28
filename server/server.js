// Module imports
const compress = require('koa-compress')
const cors = require('@koa/cors')
const Koa = require('koa')
const logger = require('koa-logger')
const path = require('path')
const removeTrailingSlashes = require('koa-no-trailing-slash')
const sass = require('koa-sass')
const serve = require('koa-static')





// Component constants
const koa = new Koa





/******************************************************************************\
  Initialize the app
\******************************************************************************/

koa.use(logger())
koa.use(removeTrailingSlashes())
koa.use(compress())
koa.use(cors())
koa.use(sass({
  src: path.resolve('.', 'src', 'scss'),
  dest: path.resolve('.', 'src', 'css'),
  prefix: '/css',
}))

koa.use(serve(path.resolve('.', 'src'), {}))

// Start the server
koa.listen(process.env.PORT || 3000)
