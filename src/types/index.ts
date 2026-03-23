export type InvoiceStatus = 'pending' | 'paid' | 'overdue';

export interface CreateClientInput {
  name: string;
  email: string;
  company?: string;
}

export interface CreateInvoiceInput {
  clientId: string;
  title: string;
  amount: number;
  dueDate: string;
}