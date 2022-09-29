# Artlist Node.js Course


#### Prerequisites 
- [Node.js version 16 installed](https://nodejs.org/en/download/)
- NPM installed (part of Node.js installation) 
- [Docker for desktop installed](https://docs.docker.com/desktop/install/windows-install/)


###### Trying things out
- open command line & run the following commands:
1.  
    ```cmd
    node -v
    ```
    expected result:
    ```cmd
    v16.14.2
    ```
    <br>
2.  
    ```cmd
    npm -v
    ```
    expected result:
    ```cmd
    6.14.17
    ```
    in case you are working with other npm version please run
    ```
    npm install npm@6.14.17 -g
    ```
    <br>
3.   
    ```cmd
    docker -v
    ```
    expected result:
    ```cmd
    Docker version 20.10.7, build f0df350
    ```
# Async programing

- Callback
- Promise
- Async Await

### Node Package Manager
 - `npm init`
 - `npm install <pacakge_name>`
 - `npm publish` 

 1. Creating an npm module - sum
 2. publishing the module
 3. testing? 


 #### EX
 Create the following module: 
 ```js
  Given two non-empty arrays of integers, write a function that determines
  whether the second array is a subsequence of the first one.

  For example
  [1,2,3,4] => [1,3,4] OR [1,4] Valid
  [1,2,3,4] => [1,9,2] OR [4,1] Invalid
 ```
### Async operations - HTTP
- Fetch countries

### 13.9
### Is nodejs is really single threaded?
- crypto lib examples
- fs examples
### Testing
1. Static - Typescript
2. Unit - Testing our lib
3. Integration - Testing few components
4. e2e - Testing a completed scenario including UI in case exist ( out of scope ) 

### Create Unit test to our Library
1. Install mocha & chai
- `npm install mocha chai --save-dev`
2. configure your script command

# EX
1. Write Unit test that asserts functionality to throw error => "Missing Array <ARRAY_NAME>" in case there is missing array
2. Write Unit test which sends 2 arrays and recieve true in case the array is sub sequence 

### Publish - prepublish test

# EX
1. Write an entry point API which serve health check response - "ok"
2. Write an entry point API which serve the countries from our last lesson

# EX - typescript
1. cd to `examples/typescript_ex`
2. run `npm install`
3. run `npm run all`
4. Add some code to `src/index.ts` and see it reflected
### Typescript
#### Configure Typescript

- `npm install -g typescript`
- `npm install ts-node`
- `npm install -g concurrently`
- `npm install nodemon -g`
`    "_run-all": "concurrently -k -p \"[{name}]\" -n \"TypescriptCompiler,application\" -c \"red.bold,yellow.bold,\" \"npm run build_watch\" \"npm run dev\"",

```json

 "devDependencies": {
    "concurrently": "^7.4.0",
    "nodemon": "^2.0.19",
    "typescript": "^4.8.3"
  }

```


### 14.9
### Building our Api - Express
- Open folder api under apps folder
- run `npm init`
- `npm install express` 
- `npm install dotenv`
- Using the fileSystem module
- Writing a middleware
- use VS get
- Https
- Communicating with 3party api
- joi
- logger

### EX
1. Create Entry point which return The the following products from the api
https://dummyjson.com/docs/products

### 19.9
- Validate Middleware
- Https
- Authentication Middleware - JWT - postponed to next session
- Connecting to DB
- Integration test

#### EX 19.9
- Create The following entry point - GET /countries/code?code=isr
- Validate the code contains 3 characters, required and only string
- delegate your request to https://restcountries.com/v3.1/alpha/{code}


### 22.9
- Authentication Middleware - JWT
- Connecting to Database - mysql
- Integration Tests
- compression

```curl
curl --location --request POST 'https://localhost/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName":"gal",
    "password":"pass1"
}'
```

### 28.9
- compression middleware
- integration test
- Secure node.js - helment
- CSRF middleware
- Dockerizing Node.js app



### EX - write register integration test
- write integration test for register entry point
- see the following curl:

```curl
curl --location --request POST 'https://localhost/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName":"sadsafadsf@gmail.com",
    "password":"pass1",
    "firstName":"gal",
    "lastName":"amouyal",
    "company":"theCompany"
}'
```

### 29.9
- Microservices
- Winston logs
- Rabbitmq
- opensearch
- logstach
- dashboards

## Docker compose up
Before - make sure to load the sql scripts in your local database.
- install docker 
- go to dev-apps folder and run  `docker-compose up` 


## Microservices
1. Flow and explanation
2. Example - Http
3. Using Message broker






