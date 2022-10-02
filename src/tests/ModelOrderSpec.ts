import {Order,OrderProduct,OrderStore} from '../models/orders';
import {User, UserStore} from '../models/users';
import {Product,ProductStore} from '../models/product';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

const testOrder:Order ={
    id : 1,
    user_id :1,
    status:"open"
}
let order:Order;
let user:User;
let product:Product;
describe("Order Model", () =>{
    beforeAll(async()=>{
        const testUser: User={
            id:0,
            first_name:"carlos",
            last_name :"vela",
            password:"lafc"
        }
        
        const testProduct:Product ={
            id:0,
            name:"ball",
            price:"15",
        
        }
        //create user because order needs a user id
        try {
            user = await userStore.create(testUser);
        } catch (error) {
            console.log("failed to add testUser.");
        }
        
        //create product because addOrderToProduct needs an order
        try {
            
            product =  await productStore.create(testProduct);
        } catch (error) {
            
        }

    });
    it("should have an index method",() =>{
        expect(orderStore.index).toBeDefined();
    });
    it("should have a create method",() =>{
        expect(orderStore.create).toBeDefined();
    });
    it("should have a show method",() =>{
        expect(orderStore.show).toBeDefined();
    });
    it("should have a show current Users Order method",() =>{
        expect(orderStore.currentUserOrders).toBeDefined();
    });
    it('should create a new order', async () => {
        const result = await orderStore.create(Number(user.id), 'open');
        order = result;
        expect(result.status).toEqual("open");
        expect(result.user_id).toEqual(Number(user.id));
    }); 
    it("should have an index method", async() =>{
        const result = await orderStore.index();
        expect(result.length).toBeGreaterThan(0);
    });
 
    it("should shop ",async() =>{
        const result = await orderStore.show(order.id.toString());
        expect(result.status).toEqual("open");
    });
    it("should have add a product",async() =>{
        const result = await orderStore.addProduct(Number(order.id),Number(product.id),5);
        expect(result.order_id).toEqual(order.id);
        expect(result.product_id).toEqual(Number(product.id));
        expect(result.quantity).toEqual(5);
    });
    it("should display currentUserOrders",async () =>{
        const result = await orderStore.currentUserOrders(String(user.id));
        expect (result.length).toBeGreaterThan(0);
    });
});
