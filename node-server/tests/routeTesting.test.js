const request = require("supertest");
const app = require("../index");
const Inventory = require("../models/inventory.model")
const Groups = require("../models/groups.model")


describe("GET Routes", () => {
  beforeAll(async () => {
    await Inventory.deleteMany();
    await Groups.deleteMany();
  });


  it('GET Inventory', async () => {
    const res = await request(app).get('/api/inventory')
    expect(res.statusCode).toEqual(200)
  })

  it('GET Group', async () => {
    const res = await request(app).get('/api/groups')
    expect(res.statusCode).toEqual(200)
  })

  it('GET Inventory Individual', async () => {
    const item = await Inventory.create({
      name: "Test Item One",
      quantity: 21,
    })
    const res = await request(app).get(`/api/inventory/${item._id}`)
    expect(JSON.parse(res.text).name).toBe("Test Item One")
    expect(JSON.parse(res.text).quantity).toEqual(21)
    expect(res.statusCode).toEqual(200)
  })
});

describe("POST Routes", () => {
  beforeAll(async () => {
    await Inventory.deleteMany();
    await Groups.deleteMany();
  });

  it('POST Inventory no group', async () => {

    const inv = {
      name: "Test One",
      quantity: 10
    }
    const res = await request(app)
    .post('/api/inventory/addItem')
    .send(inv)
    expect(res.statusCode).toEqual(200)
  })

  it('POST Inventory with group', async () => {
    const group = await Groups.create({
      name: "Group One",
    })
    const inv = {
      name: "Test Two",
      quantity: 10,
      group: group._id
    }
    const res = await request(app)
    .post('/api/inventory/addItem')
    .send(inv)
    expect(res.statusCode).toEqual(200)
  })

  it('POST Inventory Add Inventory Increase Quantity No Group', async () => {
    const inv = {
      name: "Test One",
      quantity: 10,
    }
    const res = await request(app)
    .post('/api/inventory/addItem')
    .send(inv)
    expect(res.statusCode).toEqual(200)

    const item = await Inventory.find({name: "Test One"})
    expect(item[0].quantity).toEqual(20)
  })

  it('POST Inventory Add Inventory Increase Quantity With Group', async () => {
    const group = await Groups.find({
      name: "Group One",
    })
    const inv = {
      name: "Test Two",
      quantity: 10,
      group: group[0]._id
    }
    const res = await request(app)
    .post('/api/inventory/addItem')
    .send(inv)
    expect(res.statusCode).toEqual(200)

    const item = await Inventory.find({name: "Test Two"})
    expect(item[0].quantity).toEqual(20)
  })

  it('POST Inventory Add Inventory Same Name But without Group Quantity should not increase', async () => {
    const group = await Groups.find({
      name: "Group One",
    })
    const inv = {
      name: "Test Two",
      quantity: 10
    }
    const res = await request(app)
    .post('/api/inventory/addItem')
    .send(inv)
    expect(res.statusCode).toEqual(200)

    const item = await Inventory.find({name: "Test Two", group: undefined})
    expect(item[0].quantity).toEqual(10)

    const itemTwo = await Inventory.find({name: "Test Two", group: group[0]._id})
    expect(itemTwo[0].quantity).toEqual(20)

    const itemThree = await Inventory.find({name: "Test One", group: undefined})
    expect(itemThree[0].quantity).toEqual(20)
  })

  it('POST Inventory Add Inventory Same Name But with Group Quantity should not increase', async () => {
    const group = await Groups.find({
      name: "Group One",
    })
    const inv = {
      name: "Test One",
      quantity: 10,
      group: group[0]._id
    }
    const res = await request(app)
    .post('/api/inventory/addItem')
    .send(inv)
    expect(res.statusCode).toEqual(200)

    const item = await Inventory.find({name: "Test Two", group: undefined})
    expect(item[0].quantity).toEqual(10)

    const itemTwo = await Inventory.find({name: "Test Two", group: group[0]._id})
    expect(itemTwo[0].quantity).toEqual(20)

    const itemThree = await Inventory.find({name: "Test One", group: undefined})
    expect(itemThree[0].quantity).toEqual(20)

    const itemFour = await Inventory.find({name: "Test One", group: group[0]._id})
    expect(itemFour[0].quantity).toEqual(10)
  })


});