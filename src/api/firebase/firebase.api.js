const admin = require('firebase-admin');
const { PROJECT_NAME, PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY } = process.env;
const privateKey = PRIVATE_KEY.replace(/\\n/g, '\n');
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: PROJECT_ID,
    clientEmail: CLIENT_EMAIL,
    privateKey: privateKey
  }),
  databaseURL: `https://${PROJECT_NAME}.firebaseio.com/`
});

if (!firebaseApp) {
  console.log('Failed to initialise firebase app');
  process.exit();
}

export const verifyToken = async (req, res) => {
  try {
    console.log(req.params);
    const idToken = req.params.token;
    if (!idToken) {
      res.status(400).send('Token not provided');
      return;
    }

    admin
      .auth()
      .verifyIdToken(idToken)
      .then(function(decodedToken) {
        // res.json(decodedToken);
        // console.log('Token arrived!');
        admin
          .auth()
          .getUser(decodedToken.uid)
          .then(userRecord => {
            const isEmailMatch = userRecord.email == decodedToken.email ? true : false;
            console.log(isEmailMatch);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(function(error) {
        res.status(404).send('Token not found or not valid');
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
};
