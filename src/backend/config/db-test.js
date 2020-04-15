const DB_TEST_PASSWORD = process.env.DB_TEST_PASSWORD

module.exports = {
  db: `mongodb://yac-test:${DB_TEST_PASSWORD}@ds157571.mlab.com:57571/yac-test`,
  passportSecret: 'secret'
}
