import type { ICustomerDetail } from "./customer";


export const OrderStatus = {
    ORDER: 'ORDER',
    PAYMENT: 'PAYMENT',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    DRAFT: 'DRAFT',
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMode = {
    CASH: 'CASH',
    CARD: 'TRANSFER',
} as const;

export type PaymentModeType = (typeof PaymentMode)[keyof typeof PaymentMode];

export const EditField = {
    NONE: "NONE",
    TOTAL: "TOTAL",
    CUSTOMER_PAID: "CUSTOMER_PAID",
} as const;

export type EditFieldType = (typeof EditField)[keyof typeof EditField];
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
    totalPrice: string; // Tổng thanh toán
    status: OrderStatusType;
    note?: string;
    paymentMethod?: PaymentModeType;
    customer?: ICustomerDetail;
    totalPriceChange?: string; // Tổng tiền đã được thay đổi (nếu có)
    customerPaid?: string; // Số tiền khách đưa
    surplusMoney?: string; // Số tiền thừa trả khách
}

export interface IBillPayload {
    customerId?: string;
    items: {
        menuItemId: string;
        quantity: number;
    }[];
    paymentMethod: PaymentModeType;
    cashReceived: number;
    finalAmount: number;
}

export interface IBillMenuItem {
    _id: string;
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
    discount: number;
    total: number;
}

export interface IBillDetail {
    _id: string;
    code: string;

    customer: {
        customerId: string;
        name: string;
        phoneNumber: string;
        address: string;
    };

    employeeId: {
        _id: string;
        name: string;
    };
    employeeName: string;

    items: IBillMenuItem[];

    totalQuantity: number;
    totalAmount: number;
    discount: number;
    finalAmount: number;

    paymentMethod: PaymentModeType;
    cashReceived: number;

    isDelete: boolean;

    createdAt: string;
    updatedAt: string;
}
