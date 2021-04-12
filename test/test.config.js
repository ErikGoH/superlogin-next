module.exports = {
  port: 5000,
  testMode: {
    noEmail: true,
    debugEmail: false,
    oauthDebug: true
  },
  dbServer: {
    protocol: process.env.COUCH_PROTOCOL || 'http://',
    host: process.env.COUCH_HOST || 'localhost:5984',
    user: process.env.COUCH_USER || 'admin',
    password: process.env.COUCH_PASS || 'password',
    userDB: 'sl_test-users',
    couchAuthDB: 'sl_test-keys'
  },
  security: {
    disabledRoutes: [],
    userActivityLogSize: 10
  },
  local: {
    sendConfirmEmail: true,
    sendPasswordChangedEmail: true,
    // todo: adjust once the old default behaviour works.
    usernameLogin: true,
    emailUsername: false,
    requireEmailConfirm: false
  },
  session: {
    adapter: 'redis'
  },
  mailer: {
    fromEmail: 'me@example.com'
  },
  userDBs: {
    designDocDir: __dirname + '/ddocs',
    privatePrefix: 'test'
  },
  providers: {
    facebook: {
      clientID: 'FAKE_ID',
      clientSecret: 'FAKE_SECRET'
    },
    twitter: {
      consumerKey: 'FAKE_KEY',
      consumerSecret: 'FAKE_SECRET'
    }
  }
};
