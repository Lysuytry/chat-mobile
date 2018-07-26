const express = require('express');
const app = express();
const admin = require('firebase-admin');
const port = process.env.PORT || 3000;
const projectName = process.env.PROJECT_NAME;
let serviceAccount;

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${projectName}.firebaseio.com/`
});

if (!firebaseApp) {
  console.log('Failed to initialise firebase app');
  process.exit();
}


app.get('/verify-id/:token', function(req, res) {
  const idToken = req.params.token;
  if (!idToken) {
    res.status(400).send('Token not provided');
    return;
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function(decodedToken) {
      res.json(decodedToken);
    })
    .catch(function(error) {
      res.status(404).send('Token not found or not valid');
    });
});

app.listen(port, function() {
  console.log(`Listening on port: ${port}`);
});
