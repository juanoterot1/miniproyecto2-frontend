import { OrderItem } from './order-item.model';

export interface Order {
  id: number;
  order_date: string;
  delivery_date?: string;
  status: string;
  payment_method: string;
  id_customer: number;
  order_items: OrderItem[];
}
