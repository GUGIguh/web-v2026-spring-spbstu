import mongoose, { Document, Schema, Types } from "mongoose";

export interface IOrderItem {
    goodId: number;
    quantity: number;
}

export interface IOrder extends Document {
    userId: Types.ObjectId;
    items: IOrderItem[];
    itemsQuantity: number;
    itemsPrice: number;
    orderNumber: string;
    createdAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
    {
        goodId: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
    },
    { _id: false }
);

const orderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    itemsQuantity: { type: Number, required: true },
    itemsPrice: { type: Number, required: true },
    orderNumber: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", orderSchema);