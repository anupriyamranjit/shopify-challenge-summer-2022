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

describe("DELETE Routes", () => {
  beforeAll(async () => {
    await Inventory.deleteMany();
    await Groups.deleteMany();
  });


  it('DELETE Inventory Quantity Above 0 No Group', async () => {
    const item = await Inventory.create({
      name: "DeleteTest Item One",
      quantity: 21,
    })
    ob = { quantity : 20 }
    const res = await request(app).delete(`/api/inventory/${item._id}`).send(ob)
    expect(res.statusCode).toEqual(200)
    const findItem = await Inventory.findById(item._id);
    expect(findItem.quantity).toEqual(1);
  })
  it('DELETE Inventory Quantity Below 0 No Group', async () => {
    const item = await Inventory.create({
      name: "DeleteTest Item One",
      quantity: 21,
    })
    ob = { quantity : 22 }
    const res = await request(app).delete(`/api/inventory/${item._id}`).send(ob)
    expect(res.statusCode).toEqual(200)
    const findItem = await Inventory.findById(item._id);
    expect(findItem).toBe(null);
  })
  it('DELETE Inventory Quantity Equal 0 No Group', async () => {
    const item = await Inventory.create({
      name: "DeleteTest Item One",
      quantity: 21,
    })
    ob = { quantity : 21 }
    const res = await request(app).delete(`/api/inventory/${item._id}`).send(ob)
    expect(res.statusCode).toEqual(200)
    const findItem = await Inventory.findById(item._id);
    expect(findItem).toBe(null);
  })
  it('DELETE Inventory Quantity Above 0 Group', async () => {
    const item = await Inventory.create({
      name: "DeleteTest Item One",
      quantity: 21,
    })
    ob = { quantity : 20 }
    const res = await request(app).delete(`/api/inventory/${item._id}`).send(ob)
    expect(res.statusCode).toEqual(200)
    const findItem = await Inventory.findById(item._id);
    expect(findItem.quantity).toEqual(1);
  })
  it('DELETE Inventory Quantity Below 0 Group', async () => {
    const item = await Inventory.create({
      name: "DeleteTest Item One",
      quantity: 21,
    })
    ob = { quantity : 22 }
    const res = await request(app).delete(`/api/inventory/${item._id}`).send(ob)
    expect(res.statusCode).toEqual(200)
    const findItem = await Inventory.findById(item._id);
    expect(findItem).toBe(null);
  })
  it('DELETE Inventory Quantity Equal 0 Group', async () => {
    const item = await Inventory.create({
      name: "DeleteTest Item One",
      quantity: 21,
    })
    ob = { quantity : 21 }
    const res = await request(app).delete(`/api/inventory/${item._id}`).send(ob)
    expect(res.statusCode).toEqual(200)
    const findItem = await Inventory.findById(item._id);
    expect(findItem).toBe(null);
  })
  it('DELETE Group', async () => {
    const group = await Groups.create({
      name: "DeleteTest Item One",
      quantity: 21,
    })
    const res = await request(app).delete(`/api/groups/${group._id}`)
    expect(res.statusCode).toEqual(200)
    const findItem = await Groups.findById(group._id);
    expect(findItem).toBe(null);
  })
});

describe.only("PATCH Routes", () => {
  beforeAll(async () => {
    await Inventory.deleteMany();
    await Groups.deleteMany();
  });

  it("PATCH Name and Merge", async () => {
    const item = await Inventory.create({
      name: "Item One",
      quantity: 21,
    })
    const itemTwo = await Inventory.create({
      name: "Item Two",
      quantity: 21,
    })
    updatedData = {
      name: "Item One",
      quantity: itemTwo.quantity
    }
    const res = await request(app).patch(`/api/inventory/update/${itemTwo._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200)
    find = await Inventory.findById(item._id);
    expect(find.quantity).toEqual(42)

    
  })
  it("PATCH Name and No Merge", async () => {
    const itemTwo = await Inventory.create({
      name: "Item Two",
      quantity: 21,
    })
    updatedData = {
      name: "Item Three",
      quantity: itemTwo.quantity
    }
    const res = await request(app).patch(`/api/inventory/update/${itemTwo._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200)
    find = await Inventory.findById(itemTwo._id);
    expect(find.name).toBe("Item Three")
    expect(find.quantity).toEqual(21)

    
  })
  it("PATCH Name and Merge with Group", async () => {
    const GroupOne = await Groups.create({
      name: "Group One",
    })
    const item = await Inventory.create({
      name: "Item One",
      quantity: 21,
      group: GroupOne._id
    })
    const itemTwo = await Inventory.create({
      name: "Item Two",
      quantity: 21,
    })
    updatedData = {
      name: "Item One",
      quantity: itemTwo.quantity,
      group: GroupOne._id
    }
    const res = await request(app).patch(`/api/inventory/update/${itemTwo._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200)
    find = await Inventory.findById(item._id);
    expect(find.quantity).toEqual(42)
    
  })
  it("PATCH Name and No Merge with Group", async () => {
    const GroupOne = await Groups.find({name: "Group One"});
    const GroupTwo = await Groups.create({name: "Group Two"})
    const itemTwo = await Inventory.create({
      name: "Item Two",
      quantity: 21,
      group: GroupOne._id
    })
    updatedData = {
      name: "Item Three",
      quantity: itemTwo.quantity,
      group: GroupTwo._id
    }
    const res = await request(app).patch(`/api/inventory/update/${itemTwo._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200)
    find = await Inventory.findById(itemTwo._id);
    expect(find.name).toBe(updatedData.name);
    expect(find.quantity).toEqual(updatedData.quantity);
    expect(find.group).toEqual(updatedData.group);
    
  })
  it("PATCH quantity to 0", async () => {
    const itemTwo = await Inventory.create({
      name: "Item Two",
      quantity: 21
    })
    updatedData = {
      name: "Item Two",
      quantity: 0
    }
    const res = await request(app).patch(`/api/inventory/update/${itemTwo._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200)
    find = await Inventory.findById(itemTwo._id);
    expect(find).toBe(null);
    
  })
  it("PATCH quantity to less than 0", async () => {
    const itemTwo = await Inventory.create({
      name: "Item Two",
      quantity: 21
    })
    updatedData = {
      name: "Item Two",
      quantity: -2
    }
    const res = await request(app).patch(`/api/inventory/update/${itemTwo._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200)
    find = await Inventory.findById(itemTwo._id);
    expect(find).toBe(null);
  })
  it("PATCH group name no merge", async () => {
    const GroupOne = await Groups.find({name: "Group One"});
    updatedData = {
      groupname: "Group Five",
    }
    const res = await request(app).patch(`/api/groups/update/${GroupOne[0]._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200)
    find = await Groups.findById(GroupOne[0]._id);
    expect(find.name).toBe(updatedData.groupname);
  })

  it("PATCH group name merge", async () => {
    const GroupTen = await Groups.create({name: "Group Ten"});
    const GroupSix = await Groups.create({name: "Group Six"});
    updatedData = {
      groupname: "Group Ten",
    }
    const MakeInventory = await Inventory.create({
      name: "Item Six",
      quantity: 23,
      group: GroupSix._id
    });


    const res = await request(app).patch(`/api/groups/update/${GroupSix._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200)
    find = await Groups.findById(GroupSix._id);
    expect(find).toBe(null);
    findInv = await Inventory.findById(MakeInventory._id);
    expect(findInv.group).toEqual(GroupTen._id)
  })
  it("PATCH group name merge existing ", async () => {
    const GroupTen = await Groups.find({name: "Group Ten"});
    const GroupSix = await Groups.create({name: "Group Six"});
    updatedData = {
      groupname: "Group Ten",
    }
    const MakeInventory = await Inventory.create({
      name: "Item Seven",
      quantity: 23,
      group: GroupSix._id
    });


    const res = await request(app).patch(`/api/groups/update/${GroupSix._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200)
    find = await Groups.findById(GroupSix._id);
    expect(find).toBe(null);
    findInv = await Inventory.findById(MakeInventory._id);
    expect(findInv.group).toEqual(GroupTen[0]._id)
  })
  it("PATCH group combine items after group rename", async () => {
    const GroupTest = await Groups.create({name: "Group Test"});
    const GroupTestTwo = await Groups.create({name: "Group TestTwo"});
    updatedData = {
      groupname: "Group Test",
    }
    const MakeInventory = await Inventory.create({
      name: "Item Seventeen",
      quantity: 91,
      group: GroupTest._id
    });
    const MakeInventoryTwo = await Inventory.create({
      name: "Item Seventeen",
      quantity: 9,
      group: GroupTestTwo._id
    });
    const MakeInventoryThree = await Inventory.create({
      name: "Item Eighteen",
      quantity: 18,
      group: GroupTestTwo._id
    });


    const res = await request(app).patch(`/api/groups/update/${GroupTestTwo._id}`).send(updatedData)
    expect(res.statusCode).toEqual(200);

    findInv = await Inventory.findById(MakeInventory._id);
    expect(findInv.quantity).toEqual(100)

    findInvTwo = await Inventory.findById(MakeInventoryTwo._id);
    expect(findInvTwo).toBe(null)

    findInvThree = await Inventory.findById(MakeInventoryThree._id);
    expect(findInvThree.quantity).toBe(18)
    expect(findInvThree.name).toBe("Item Eighteen")
    expect(findInvThree.group).toEqual(GroupTest._id)
  })
})