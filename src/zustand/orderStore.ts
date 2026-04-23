

import type { ICustomerDetail } from "@/types/customer";
import { OrderStatus, type IBillDetail, type Order, type OrderForm, type OrderStatusType, type PaymentModeType } from "@/types/order";
import { create } from "zustand";

interface OrderState {
    // management current order
    currentOrder: Order[] | null;
    addCurrentOrder: (order: Order) => void;
    addListCurrentOrder: (orders: Order[]) => void;
    removeCurrentOrderById: (productId: string) => void;
    removeAllCurrentOrder: () => void;
    updateQuantityCurrentOrder: (orderId: string, quantity: number) => void;

    //management order form
    orderForm: OrderForm | null;
    setOrderForm: (orderForm: OrderForm) => void;
    removeOrderForm: () => void;
    updatePaymentMethodOrderForm: (paymentMethod: PaymentModeType) => void;
    updateCustomerOrderForm: (customer?: ICustomerDetail) => void;
    updateTotalPriceChangeOrderForm: (totalPriceChange: string) => void;
    updateCustomerPaidOrderForm: (customerPaid: string) => void;

    // management draft order
    draftOrders: OrderForm[];
    addDraftOrder: (order: OrderForm) => void;
    removeDraftOrderById: (orderId: string) => void;

    //management bill
    bill: IBillDetail | null;
    setBill: (bill: IBillDetail) => void;

    //search product
    searchQuery: string;
    setSearchQuery: (query: string) => void;

    //status order
    statusOrder: OrderStatusType;
    setStatusOrder: (status: OrderStatusType) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    // management current order
    currentOrder: null,
    addCurrentOrder: (order: Order) => set((state) => ({
        currentOrder: state.currentOrder ? [...state.currentOrder, order] : [order],
    })),
    addListCurrentOrder: (orders: Order[]) => set((state) => ({
        currentOrder: state.currentOrder ? [...state.currentOrder, ...orders] : orders,
    })),
    removeCurrentOrderById: (productId: string) => set((state) => ({
        currentOrder: state.currentOrder ? state.currentOrder.filter(order => order._id !== productId) : null,
    })),
    removeAllCurrentOrder: () => set({ currentOrder: null }),
    updateQuantityCurrentOrder: (orderId: string, quantity: number) => set((state) => ({
        currentOrder: state.currentOrder ? state.currentOrder.map(order => order._id === orderId ? { ...order, quantity } : order) : null,
    })),

    // management order form
    orderForm: null,
    setOrderForm: (orderForm: OrderForm) => set({ orderForm }),
    removeOrderForm: () => set({ orderForm: null }),
    updatePaymentMethodOrderForm: (paymentMethod: PaymentModeType) => set((state) => ({
        orderForm: state.orderForm ? { ...state.orderForm, paymentMethod } : null,
    })),
    updateCustomerOrderForm: (customer?: ICustomerDetail) => set((state) => ({
        orderForm: state.orderForm ? { ...state.orderForm, customer: customer ?? undefined } : null,
    })),
    updateTotalPriceChangeOrderForm: (totalPriceChange: string) => set((state) => ({
        orderForm: state.orderForm ? { ...state.orderForm, totalPriceChange } : null,
    })),
    updateCustomerPaidOrderForm: (customerPaid: string) => set((state) => ({
        orderForm: state.orderForm ? { ...state.orderForm, customerPaid } : null,
    })),

    // management draft order
    draftOrders: [],
    addDraftOrder: (order: OrderForm) => set((state) => ({
        draftOrders: [...state.draftOrders, order],
    })),
    removeDraftOrderById: (orderId: string) => set((state) => ({
        draftOrders: state.draftOrders.filter(order => order.code !== orderId),
    })),

    //management bill
    bill: null,
    setBill: (bill: IBillDetail) => set({ bill }),

    //search product
    searchQuery: "",
    setSearchQuery: (query: string) => set({ searchQuery: query }),

    //status order
    statusOrder: OrderStatus.ORDER,
    setStatusOrder: (status: OrderStatusType) => set({ statusOrder: status }),
}));
