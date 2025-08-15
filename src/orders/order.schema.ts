import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId; // Reference to User collection

  @Prop({
    type: [
      {
        product_id: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    required: true,
  })
  items: { product_id: Types.ObjectId; quantity: number }[];

  @Prop({ required: true })
  total_amount: number;

  @Prop({
    required: true,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Payment' })
  payment_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Fulfilment' })
  fulfilment_id: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);