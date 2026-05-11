import mongoose, { Document, Schema } from "mongoose";

export interface IGood extends Document {
    id: number;
    name: string;
    rating: number;
    isHit: boolean;
    isNewProd: boolean;
    price: number;
    type: string | null;
    color: string | null;
    description: string;
    characteristics: string;  // можно массив, но строка проще для начала
}

const goodSchema = new Schema<IGood>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    isHit: { type: Boolean, required: true },
    isNewProd: { type: Boolean, required: true },
    price: { type: Number, required: true },
    type: { type: String, default: null },
    color: { type: String, default: null },
    description: { type: String, default: "" },
    characteristics: { type: String, default: "" },
});

export default mongoose.model<IGood>("Good", goodSchema);