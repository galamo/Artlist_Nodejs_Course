const { expect } = require("chai");
require("dotenv").config()
const axios = require("axios")
const { getConnection } = require("../db")
const { faker } = require("@faker-js/faker")

// users , company, first_name, last_name, email, password

function getRandomUser() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        company: faker.company.name(),
        userName: faker.internet.email(),
        password: faker.internet.password(),
    }
}

const currentUser = getRandomUser();
before(async () => {
    const { firstName, lastName, company, userName, password } = currentUser;
    await getConnection().execute(getInsertSqlQuery(), [company, firstName, lastName, userName, password])
})
describe("login user", () => {
    it("Should return 200 - Login Success", async () => {
        try {
            const { data } = await axios.post(`${process.env.BASE_URL}/login`, { userName: currentUser.userName, password: currentUser.password })
            expect(typeof data).to.be.equal('string')
        } catch (ex) {
            throw new Error("Login Failed")
        }
    })
    it("Should return 401", async () => {
        try {
            const { data } = await axios.post(`${process.env.BASE_URL}/login`, { userName: "bla", password: "bla" })
            throw new Error("Authorization broken")
        } catch (ex) {
            expect(ex.response.status).to.be.equal(401)
        }
    })
})
after(async () => {
    await getConnection().execute(getDeleteQuery(), [currentUser.userName])
})

function getDeleteQuery() {
    return `DELETE FROM northwind.users WHERE (email_address = ?);`
}

function getInsertSqlQuery() {
    return `INSERT INTO northwind.users (company, last_name, first_name, email_address, password) VALUES (?,?,?,?,?);`
}