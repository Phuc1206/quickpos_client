

export const OrderStatus = {
    ORDER: 'ORDER',
    PAYMENT: 'PAYMENT',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    DRAFT: 'DRAFT',
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];


export interface Order {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface OrderForm {
    _id: string;
    code: string;
    timeOrder: Date;
    orders: Order[];
    totalPrice: number;
    status: OrderStatusType;
    note: string;
}