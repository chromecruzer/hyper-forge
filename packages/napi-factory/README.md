# 🌟 C++ and Rust Addon Project 🌟


## 📦 Overview

This project combines C++ and Rust plugins into a Node.js application, utilizing `node-addon-api` for performance-critical operations. 

### 📜 Project Details

```json
{
  "name": "cpp",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build:cpp:plugin": "node-gyp clean && node-gyp configure && node-gyp build",
    "build:rs:plugin": "cd @bunvader/rustacean && npm i && npm run build",
    "dev": "nodemon src/app.js --inspect"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@bunvader/rustacean": "^0.0.2",
    "express": "^4.21.1",
    "node-addon-api": "^8.2.1"
  },
  "devDependencies": {
    "node-gyp": "^10.2.0"
  }
}


## Vs code settings.json
```
{
    "C_Cpp.default.compilerPath": "d:\\node-cpp\\node_modules\\node-addon-api\\napi.h",
    "C_Cpp.errorSquiggles": "enabled"
}

```