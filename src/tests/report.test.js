const request = require('supertest')
const app = require('../app')

describe("Test report to get json result", () => {
    test("It should response all bots PME", () => {
        return request(app)
            .get("/report")
            .expect(200)
    })
})