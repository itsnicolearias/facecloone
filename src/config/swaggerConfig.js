const path = require('path')

exports.swaggerConfig = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Facecloone - API ',
      description: 'An Facebook clone made in Node JS',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Server Local',
      },
    ],
  },
  apis: [`${path.join(__dirname, '../controllers/*.js')}`],
}