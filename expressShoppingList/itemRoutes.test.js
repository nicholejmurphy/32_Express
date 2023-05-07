process.env.NODE_ENV = "test";
const request = require("supertest");

const items = require("./fakeDb");
const app = require("./app");

let item = { name: "apple", price: "1.20" };

beforeEach(function () {
  items.push(item);
});

afterEach(function () {
  items.length = 0;
});

describe("GET /items", () => {
  test("Get items.", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [item] });
  });
});

describe("GET /items/:name", () => {
  test("Get specific item.", async () => {
    const res = await request(app).get(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(item);
  });
  test("Get invalid item.", async () => {
    const res = await request(app).get(`/items/butterfly`);
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Create item.", async () => {
    const res = await request(app).post("/items?name=banana&price=0.70");
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      name: "banana",
      price: "0.70",
    });
  });
});

describe("PATCH /items/:name", () => {
  test("Update item.", async () => {
    const res = await request(app).patch("/items/apple?name=banana&price=0.70");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      name: "banana",
      price: "0.70",
    });
  });
  test("Update invalid item.", async () => {
    const res = await request(app).patch(
      "/items/orange?name=banana&price=0.70"
    );
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Delete item.", async () => {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ Message: "Deleted" });
  });
  test("Delete invalid item.", async () => {
    const res = await request(app).delete("/items/orange");
    expect(res.statusCode).toBe(404);
  });
});
