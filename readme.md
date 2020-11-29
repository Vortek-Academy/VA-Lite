# Discord Bot Framework

This readme is meant for developers to explain the bot setup.

### How to setup the `config.json`?

```json
{
  "development": {
    "token": "DEVELOPMENT TOKEN",
    "uri": "DEVELOPMENT MONGO DATABASE",
    "client": "CLIENT SECRET OF DEVELOPMENT BOT",
    "redirect": "REDIRECT URI FOR OAUTH2",
    "api": "THE WEBISTE DOMAIN"
  },
  "production": {
    "token": "PRODUCTION TOKEN",
    "uri": "PRODUCTION MONGO DATABASE",
    "client": "CLIENT SECRET OF PRODUCTION BOT",
    "redirect": "REDIRECT URI FOR OAUTH2",
    "api": "THE WEBISTE DOMAIN"
  }
}
```

### How to setup the `.env`?

```.env
TYPE=development
```

**OR**

```.env
TYPE=production
```

Use it based on environment. The `development` type should be used when you are testing the code.

### Warning!

Please do not push the `config.json` or the `.env` to GitHub.
Use your own local `config.json` and `.env` files to maintain the safety of the bot!

### License

This project is licensed under the Apache 2.0 License.

### Contributors

The contributors to this project are:

- ThatAnonymousG
- Johna-3212
