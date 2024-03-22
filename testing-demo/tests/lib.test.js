const lib = require("../lib");
const db = require("../db");

describe("absolute", () => {
  it("should return a positive no if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive no if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Shrikant");
    expect(result).toMatch(/Shrikant/);
    expect(result).toContain("Shrikant");
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    // Too general
    // expect(result).toBeDefined();
    // expect(result).not.toBeNull();

    // Too specific
    // expect(result[0]).toBe("USD");
    // expect(result[1]).toBe("AUD");
    // expect(result[2]).toBe("EUR");
    // expect(result.length).toBe(3);

    // Proper way
    // expect(result).toContain("USD");
    // expect(result).toContain("AUD");
    // expect(result).toContain("EUR");

    // Ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 }); // list only the properties that we are interested in
    expect(result).toHaveProperty("id", 1); // check for a single property
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    // Null, undefined, NaN, '', 0, false
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((arg) => {
      expect(() => {
        lib.registerUser(arg);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Shrikant");
    expect(result).toMatchObject({ username: "Shrikant" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    // mock fn
    db.getCustomerSync = function (customerId) {
      console.log("Reading Fake customer data...");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});
