export interface Sale {
    id: number;
    sale_date: string;
    total_amount: number;
    id_customer: number;
    id_order?: number;
  }
  