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
### Building our Api
- Open folder api under apps folder
- run `npm init`
- `npm install express` 
- `npm install dotenv`


## EX
Before - make sure to load the sql scripts in your local database.
- install docker 
- go to dev-apps folder and run  `docker-compose up` 
1. Cover your server functionality writing with Unit Test
2. Create Api with the following functionality 
2.1 GET /products 
return the all products from products table
2.3 GET /products/:category
2.4 return the products by category
2.5 GET /orders?tax_rate=:number
2.6 return all the orders which higher then the given tax rate ( convert the tax to $)
3. Cover the Api's with integration test
4. print all the incoming payload 


# Integration tests
## Common issues
  1. parallel
  2. garbich data 

# Passport
```js
 app.get('/checkAuth', ensureAuthenticated, function (req, res) {
  res.json({ message: "yes we made it!!!" })
});
```



# JWT
## Microservices
1. Flow and explanation
2. Example - Http
3. Using Message broker


## Docker
1. Overview
2. From File to container
3. Dockerizing nodejs application




#### Code section

```js

export async function getCustomerByCity(city: string) {
    if (typeof city !== 'string') return;
    const [result] = await getConnection().execute("select * from customers where city = ?", [city])
    if (!Array.isArray(result)) return [];

    const customers = result.map(customer => {
        return {
            ...customer, role: getRoleByJobTitle(roleMapping, customer["job_title"]),
            mail: getEmailAddress(customer["first_name"], customer["last_name"], "gmail")
        }
    })
    return customers;
}

```

# integration test

```js

const { expect } = require("chai");
require("dotenv").config();
const axios = require("axios");
const { PORT, BASE_URL } = process.env
const { getConnection } = require("../../../dist/db/index")


let randomCity = `city_${Math.ceil(Math.random() * 99999)}`
before(async () => {
    const connection = getConnection();
    await connection.execute(getInsertQuery(), [...getCustomerValues(randomCity)])
    await connection.execute(getInsertQuery(), [...getCustomerValues(randomCity)])
})


describe("/api/customers/:city", () => {
    it("return ok", async () => {
        const { data } = await axios.get(`http://${BASE_URL}:${PORT}/customers/${randomCity}`)

    })
})

after(async () => {
    const connection = getConnection();
    await connection.execute(`delete from northwind.customers where city = ?`, [randomCity])
})


function getInsertQuery() {
    return `INSERT INTO northwind.customers
    (id,
    company,
    last_name,
    first_name,
    email_address,
    job_title,
    city,
    state_province,
    zip_postal_code) VALUES (?,?,?,?,?,?,?,?,?)`
}

function getCustomerValues(randomCity) {
    return [Math.ceil(Math.random() * 99999), "company",
        "test_last_name", "test_first_name", null, "Owner", randomCity, "state", "test_code"]
}


```


```js
const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    console.log(authorizationHeader)
    jwt.verify(authorizationHeader, "process.env.SECRET", function (err, decoded) {

        if (err) {
            console.log(err)
            return res.status(401).send("UnAuthorized")
        }
        req.isAdmin = decoded.isAdmin;
        return next();

    })
}
function verifyIsAdmin(req, res, next) {
    if (req.isAdmin) return next();
    return res.send("Not Authorized")
}
```