const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

/**
 * Using for check all routers has auth.authenticate()
 *
 * Fetching Authorization=TOKEN from header which encoded by jwt
 * decode and get id from payload to find user
 *
 */

module.exports = function() {
  const strategy = new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      //jwtFromRequest: autt
      jwtFromRequest: ExtractJwt.fromHeader('authorization')
    },
    async (payload, done) => {
      var user = payload.sub;

      if (user) {
        // if (payload.exp <= Date.now()) {
        //   return done(null, false, { message: 'Expired Token' });
        // } else {
        //   return done(null, user);
        // }
        return done(null, user);
      } else {
        return done(new Error('User not found'), null);
      }
    }
  );

  passport.use(strategy);

  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate('jwt', { session: false });
    }
  };
};

const autt = () => {
  const token_userId_15 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNSwidXNlcm5hbWUiOiJ2aXRhbHMiLCJwYXNzd29yZCI6IiQyYSQwOCR5LnZJMTdOYXFOb2V2TnJvMDF1WWF1VHdNOUcveWRIUFhadnZHQkdiTUVDOHcuMlRKLkVUYSIsImVtYWlsIjoidml0YWxzQGhvdG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJzdGF0dXMiOiJhY3RpdmUiLCJjcmVhdGVkQnkiOm51bGwsInVwZGF0ZWRCeSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxNDozMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAxOC0wNy0xM1QwMjoxNDozMi4wMDBaIn0sImlhdCI6MTUzMjMwODY0MzkxMCwiZXhwIjoxNTMyMzk1MDQzOTEwfQ.hzMAPNBxnENn9CLizhQ0rVPtna0Reau6coMCnBBxC74';
  const token_userId_14 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxNCwidXNlcm5hbWUiOiJ2aXRhbCIsInBhc3N3b3JkIjoiJDJhJDA4JG5PVVJGNVE1L0JXYnlqN2xVTG9kSy44bERCOHNVODVKYUhKTUsxM04xYXNXMGE4MkphV3JDIiwiZW1haWwiOiJ2aXRhbEBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoiYWN0aXZlIiwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MTM6NDAuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MTM6NDAuMDAwWiJ9LCJpYXQiOjE1MzIzMDg2MTc2MDgsImV4cCI6MTUzMjM5NTAxNzYwOH0._NtsrFVJC6j0TsCU45KacJ8cfWd2LuwS-FJCxqUmnGY';
  const token_userId_13 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMywidXNlcm5hbWUiOiJ2eSIsInBhc3N3b3JkIjoiJDJhJDA4JFdFcHVOQVk2N2FoYWVuNmQuRFd2eXVJN2U1cDNPeENtVW1zTFNQTjZLMFllZUF4UUZJdWNlIiwiZW1haWwiOiJ2eUBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoiYWN0aXZlIiwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MTA6NTUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MTA6NTUuMDAwWiJ9LCJpYXQiOjE1MzIzMDg1OTAzMDEsImV4cCI6MTUzMjM5NDk5MDMwMX0.pkDwNDuDg8nRTfJMMau7h8XpXVcqxB-J7aLeRr9veGw';
  const token_userId_12 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMiwidXNlcm5hbWUiOiJ2dXRoYSIsInBhc3N3b3JkIjoiJDJhJDA4JHZqcGE3blAxdXJXdHZJTi45dGpIL09qR2pObk0xMlFBMVV0UGRTbTNjTEVXTDJHZEh3WmE2IiwiZW1haWwiOiJ2dXRoYUBob3RtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwic3RhdHVzIjoiYWN0aXZlIiwiY3JlYXRlZEJ5IjpudWxsLCJ1cGRhdGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MDk6NTUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMTgtMDctMTNUMDI6MDk6NTUuMDAwWiJ9LCJpYXQiOjE1MzIzMDg1NTgyODEsImV4cCI6MTUzMjM5NDk1ODI4MX0.FDf5H2l6pT6q6Jqg3dIK-TU0KALgfNOTJwrFkFe20Bs';
  const token_userId_11 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVc2VyIEF1dGhlbnRpY2F0aW9uIiwic3ViIjp7ImlkIjoxMSwidXNlcm5hbWUiOiJyeXJpIiwicGFzc3dvcmQiOiIkMmEkMDgkNllmYnV0RDBEMW5ZUnNrWDZXbGxCT005Q3pnLkhOMi9tSXlLMmlpNTN5MThJYkdlbW9JUlMiLCJlbWFpbCI6InJ5cmlAaG90bWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN0YXR1cyI6ImFjdGl2ZSIsImNyZWF0ZWRCeSI6bnVsbCwidXBkYXRlZEJ5IjpudWxsLCJjcmVhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjA5OjIxLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE4LTA3LTEzVDAyOjA5OjIxLjAwMFoifSwiaWF0IjoxNTMyMzA4NTAzNjQwLCJleHAiOjE1MzIzOTQ5MDM2NDB9.TG-iqvayLTLDre7saMRRX8xTBcrJiILizrT0RM7kGqY';
  const myArray = [token_userId_15, token_userId_14, token_userId_13, token_userId_12, token_userId_11];
  const token = myArray[Math.floor(Math.random() * myArray.length)];
  //console.log('***************<>******************** ', rand);

  return token;
};
