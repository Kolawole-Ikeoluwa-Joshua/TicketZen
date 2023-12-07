import { Listener, OrderCancelledEvent, Subjects, OrderStatus } from "@scar-tickets/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";


export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {

        // find order
        const order = await Order.findOne({
            _id: data.id,
            version: data.version - 1
        });
        
        // if order not found
        if (!order) {
            throw new Error('Order not found');
        }
        
        // else
        // update order status
        order.set({ status: OrderStatus.Cancelled });
        await order.save();

        // ack the message
        msg.ack();
    }
}