# Discord Bot Framework

This readme is meant for developers to explain the bot setup.

### How to setup the `config.json`?

```json
{
  "development": {
    "token": "TEST BOT TOKEN"
  },
  "production": {
    "token": "MAIN BOT TOKEN"
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
