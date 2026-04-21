

export const OrderStatus = {
    ORDER: 'ORDER',
    PAYMENT: 'PAYMENT',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    DRAFT: 'DRAFT',
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMode = {
    CASH: 'CASH',
    CARD: 'CARD',
} as const;

export type PaymentModeType = (typeof PaymentMode)[keyof typeof PaymentMode];
export interface Order {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface OrderForm {
    code: string;
    timeOrder: Date;
    orders: Order[];
    totalPrice: number; // Tổng thanh toán
    status: OrderStatusType;
    note?: string;
    paymentMethod?: PaymentModeType;
    totalPriceChange?: number; // Tổng tiền đã được thay đổi (nếu có)
    customer?: string;
    customerMoney?: number; // Số tiền khách đưa
    surplusMoney?: number; // Số tiền thừa trả khách
}