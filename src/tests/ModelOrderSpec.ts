import {Order, OrderStore} from '../models/orders';

const orderStore = new OrderStore();

describe("Order Model", () =>{
    it("should have an index method",() =>{
        expect(orderStore.currentOrder).toBeDefined();
    });

});
