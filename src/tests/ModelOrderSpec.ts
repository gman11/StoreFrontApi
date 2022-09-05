import {Order, OrderStore} from '../models/orders';

const orderStore = new OrderStore();

describe("Order Model", () =>{
    it("should have an index method",() =>{
        expect(orderStore.index).toBeDefined();
    });
    it("should have a create method",() =>{
        expect(orderStore.create).toBeDefined();
    });
    it("should have a show method",() =>{
        expect(orderStore.show).toBeDefined();
    });
/*     it('create method should add a product to order', async () => {
        const result = await orderStore.create(1, 'open');
        expect(result).toEqual({
          id:1, 
          user_id: 1,
          status:'open'
        });
    }); */
    it("should have a show current Users Order method",() =>{
        expect(orderStore.currentUserOrders).toBeDefined();
    });

});
