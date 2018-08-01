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

// export const verifyToken = async (req, res, next) => {
//   try {
//     console.log(req.params);
//     const idToken = req.params.token;
//     if (!idToken) {
//       res.status(400).send('Token not provided');
//       return;
//     }
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     console.log('Username is: ', decodedToken.name);
//     res.status(400).send(idToken);
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(404).send('Token not found or not valid');
//   }
// };

export const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      res.status(400).send('Token not provided');
      return;
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Email is:', decodedToken.email);
    const username = decodedToken.name;
    const email = decodedToken.email;
    req.body = {username, email};
    next();
  } catch (error) {
    console.log(error);
    res.status(404).send('Token not found or not valid');
  }
};
