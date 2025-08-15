import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() orderData: Partial<Order>) {
    return this.orderService.create(orderData);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Order>) {
    return this.orderService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
