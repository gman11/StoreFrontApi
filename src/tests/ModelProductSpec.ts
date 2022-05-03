import { Product,ProductStore } from "../models/product";

const productStore = new ProductStore();

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
    it('create method should add a product', async () => {
        const result = await productStore.create({
          name: 'Pencil',
          price: '5'
        });
        expect(result).toEqual({
          id:1, 
          name: 'Pencil',
          price:'5'
        });
    });
    it('index method should return a list of products', async () => {
        const result = await productStore.index();
        console.log("test list");

        console.log(result);
        expect(result.length).toEqual(1);  
    });     
});