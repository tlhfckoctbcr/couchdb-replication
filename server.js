const nano = require('nano')

const niarx = nano({
  url: 'http://localhost:5985',
  request_defaults: {
    auth: {
      username: process.env.COUCH_USERNAME,
      password: process.env.COUCH_PASSWORD
    }
  }
})

const cb = (err, body) => {
  if (err) throw err
  console.log('Body: ', body)
}

const replicatePatient = (patients, source, target) => {
  if (!patients) throw 'Patient ID must be defined.'
  niarx.db.replicate(source, target, {
    create_target: false,
    doc_ids: patients
  }, cb)
}
