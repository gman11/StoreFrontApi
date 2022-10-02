import exp from "constants";
import { Product,ProductStore } from "../models/product";

const productStore = new ProductStore();
let prodcut:Product;
describe("Product Model", () =>{
    it("should have an index method",() =>{
        expect(productStore.index).toBeDefined();
    });
    it("should have a create method",() =>{
        expect(productStore.create).toBeDefined();
    });
    it("should have a show method",() =>{
        expect(productStore.show).toBeDefined();
    });
    it("should have a update method",() =>{
        expect(productStore.update).toBeDefined();
    }); 
    it("should create a product", async()=>{
        const newProduct:Product ={
            id:0,
            name:"pencil",
            price:"10"
        }
        const result  = await productStore.create(newProduct);
        prodcut = result;
        expect(result.name).toEqual(newProduct.name);
        expect(result.price).toEqual(newProduct.price);
    });
    it("should show the index products",async ()=>{
      const results = await productStore.index();
      expect(results.length).toBeGreaterThan(0);
    });
    it("should show the product",async ()=>{
        const results = await productStore.show(String(prodcut.id));
        expect(results.name).toEqual(prodcut.name);
    });
    it("should update the product",async ()=>{
        prodcut.name = "notebook";
        prodcut.price = "50";
        const results = await productStore.update(prodcut);
        expect(results.name).toEqual(prodcut.name);
    });
});