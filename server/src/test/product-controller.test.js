import { describe, test, expect, jest} from "@jest/globals";
import request from "supertest";
import app from "../api/api.js";
import db from "../db/index.js";
import Product from "../models/Product.js";

describe ("Product Controller", ()=>{
    const baseUrl = "/api/budget-control/product/create"
    const testProduct = {name : "Test Product"};

    afterAll(()=>{
        db.get().close();
    });

    test("POST - Product Creation Controller Success", async () =>{
        jest.spyOn(Product, "create").mockImplementation(async () => testProduct);
        //con build().save()
        //jest.spyOn(Product, "build").mockImplementation({save: async () => testProduct});


        const response = await request(app).post(baseUrl).send(testProduct);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(testProduct.name);
    });

    //otra forma
    // it("Should returna a Product when callin with http method GET", async() =>{});
});