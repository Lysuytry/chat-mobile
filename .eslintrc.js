module.exports = {
  "env": {
      "node": true,
      "es6": true
  },
  "extends": ["babel", "eslint-config-prettier", "eslint:recommended"],
  "parserOptions": {
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true
      },
      "sourceType": "module"
  },
  "rules": {
      "no-console":0,
      "no-eval": 1,
      "indent": [
          "error",
          2
      ],
      "semi": [
          "error",
          "always"
      ]
  }
};
