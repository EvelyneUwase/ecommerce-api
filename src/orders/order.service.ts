import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  create(data: Partial<Order>) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  findAll() {
    return this.orderModel.find().populate('user').exec();
  }

  findOne(id: string) {
    return this.orderModel.findById(id).populate('user').exec();
  }

  async update(id: string, updateData: Partial<Order>) {
    const updated = await this.orderModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) throw new NotFoundException(`Order ${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.orderModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Order ${id} not found`);
    return { message: 'Order deleted successfully' };
  }
}
