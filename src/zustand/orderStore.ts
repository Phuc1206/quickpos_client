

import { OrderStatus, type Order, type OrderForm, type OrderStatusType } from "@/types/order";
import { create } from "zustand";

interface OrderState {
    // management current order
    currentOrder: Order[] | null;
    addCurrentOrder: (order: Order) => void;
    removeCurrentOrderById: (productId: string) => void;
    removeAllCurrentOrder: () => void;
    updateQuantityCurrentOrder: (orderId: string, quantity: number) => void;

    //management order form
    orderForm: OrderForm | null;
    setOrderForm: (orderForm: OrderForm) => void;

    // management draft order
    draftOrders: OrderForm[];

    //search product
    searchQuery: string;
    setSearchQuery: (query: string) => void;

    //status order
    statusOrder: OrderStatusType;
    setStatusOrder: (status: OrderStatusType) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    currentOrder: null,
    addCurrentOrder: (order: Order) => set((state) => ({
        currentOrder: state.currentOrder ? [...state.currentOrder, order] : [order],
    })),
    removeCurrentOrderById: (productId: string) => set((state) => ({
        currentOrder: state.currentOrder ? state.currentOrder.filter(order => order._id !== productId) : null,
    })),
    removeAllCurrentOrder: () => set({ currentOrder: null }),
    updateQuantityCurrentOrder: (orderId: string, quantity: number) => set((state) => ({
        currentOrder: state.currentOrder ? state.currentOrder.map(order => order._id === orderId ? { ...order, quantity } : order) : null,
    })),

    orderForm: null,
    setOrderForm: (orderForm: OrderForm) => set({ orderForm }),

    draftOrders: [],

    searchQuery: "",
    setSearchQuery: (query: string) => set({ searchQuery: query }),

    statusOrder: OrderStatus.ORDER,
    setStatusOrder: (status: OrderStatusType) => set({ statusOrder: status }),
}));
