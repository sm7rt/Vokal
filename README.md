# Environment installation

Ensure you have node js installed on your computer. Then install yarn globally if you don't have already it.
  

## Installing

You only have to install dependencies with yarn.

```javascript

- yarn install

```
## Running Project

```javascript

- yarn start

```
It will launch the app in your browser : http://localhost:3000

## Building App

```javascript

- yarn build
- serve -s build

```
It will build the application in production mode. You can test it, with serve. 


## Testing


```javascript

- yarn test
```
In order to run Cypress test, launch the command below

```javascript

- yarn test:e2e
```
If you want use Cypress in dev mode (with ability to run only one test and see live result), you can run
```javascript

- cypress:open
```

## GENERATING SWAGGER CI
Download the service json file from swagguer and put it in "swagger" folder.
If a previous json file existed for this service, just search a prefix by "dsten" command in package.json file with the correct name of the service. For example :
 ```javascript

- dsten:account
```

Else you can create a new command in package.json like :
 ```javascript

- "dsten:customer": "yarn dtsgen --out ./src/services/models/CustomerApiModel.d.ts ./swagger/customer-service.json --namespace CustomerApiDefinitions",
```

Then run this command, it will generate the Typecript model of the CI in "src/services/models" folder.