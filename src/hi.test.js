import getHi from "./hi.js"

describe("getHi", () => {
  it("returns 'Hi'", () => {
    const result = getHi()
    expect(result).toBe("Hi")
  })
})
