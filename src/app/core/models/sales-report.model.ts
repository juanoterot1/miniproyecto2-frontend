export interface SalesReport {
    id: number;
    report_type: string;
    report_date: string;
    total_sales: number;
    most_sold_product?: string;
    least_sold_product?: string;
    pending_collections?: number;
    id_customer: number;
  }
  