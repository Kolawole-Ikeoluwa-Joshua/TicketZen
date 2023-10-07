# Code Sharing and Reuse between Services

1. Create public NPM organization

2. Publish NPM Modules

```
// setup common directory and rename package.json
mkdir common
npm init -y

// create a new git repo for common and commit changes
cd common
git init, git add, git commit

// login to NPM
npm login

// publish to NPM organization
npm publish --access public

```

3. Set up tooling for common module

```
// generate typescript config file
tsc --init

// install dev dependencies
npm install typescript del-cli --save-dev

// update tsconfig & package.json for typescript to javascript transpiling

package.json:
"scripts": {
    "clean": "del-cli ./build/*",
    "build": "tsc"
},

tsconfig:
"declaration": true,
"outDir": "./build",

// addtional configs:
  "types": "./build/index.d.ts",
  "files": [
    "build/**/*"
],

// version changes to common module
npm version patch

// build module and publish
npm run build
npm publish
```

4. Set up easy publish script - just for this project usecase

NOTE: Not ideal in a real-world project, just to speed up package publishing process in this project

```
/* custom publish script
 "scripts": {
    "clean": "del-cli ./build/*",
    "build": "npm run clean && tsc",
    "pub": "git add . && git commit -m \"Updates\" && npm version patch && npm run build && npm publish"
  }
*/

// publish module
npm run pub
```

5. Relocate shared code

moving shared codes from auth service:

```
// move middlewares and errors into common's src directory

// export modules into common's index.ts

// install dependencies in common directory
npm install express express-validator cookie-session jsonwebtoken @types/cookie-session @types/express @types/jsonwebtoken

// publish common module
npm run pub
```

6. Updating auth service

```
// navigate to the auth directory and install common module
npm install @scar-tickets/common

// update import statements in auth's src
```

7. Updating common module

```
// make changes
// build module
npm run pub

// update auth dependency
npm update @scar-tickets/common

// you can verify the auth container is running latest common module
// by locating the pacakage.json in the container
kubectl exec -it <auth-container-id> sh
```
