import * as TransactionsController from "./TransactionsController"
// @ponicode
describe("list", () => {
    let inst: any

    beforeEach(() => {
        inst = new TransactionsController.TransactionsController()
    })

    test("0", async () => {
        await inst.list(undefined, undefined)
    })
})

// @ponicode
describe("remove", () => {
    let inst: any

    beforeEach(() => {
        inst = new TransactionsController.TransactionsController()
    })

    test("0", async () => {
        await inst.remove(undefined, undefined)
    })
})

// @ponicode
describe("import", () => {
    let inst: any

    beforeEach(() => {
        inst = new TransactionsController.TransactionsController()
    })

    test("0", async () => {
        await inst.import(undefined, undefined)
    })
})
