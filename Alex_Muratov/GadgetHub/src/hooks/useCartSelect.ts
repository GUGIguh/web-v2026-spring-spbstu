import { useState, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeItem } from "../store/cartSlice";

export default function useCartSelect() {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const cartItems = useAppSelector(state => state.cart.items);
    const dispatch = useAppDispatch();
    const itemsArray = useMemo(() => Object.values(cartItems), [cartItems]);

    const allItems = useMemo(() => {
        return itemsArray.reduce(
            (acc, item) => ({
                totalPrice: acc.totalPrice + item.price * item.quantity,
                totalQuantity: acc.totalQuantity + item.quantity,
            }),
            { totalPrice: 0, totalQuantity: 0 }
        );
    }, [itemsArray]);

    const allSelected = itemsArray.length > 0 && itemsArray.every(item => selectedIds.has(item.id));

    const selectedItems = useMemo(() => {
        const selected = itemsArray.filter(item => selectedIds.has(item.id));
        return {
            items: selected,
            totalPrice: selected.reduce((sum, item) => sum + item.price * item.quantity, 0),
            totalQuantity: selected.reduce((sum, item) => sum + item.quantity, 0),
        };
    }, [itemsArray, selectedIds]);

    const toggleSelect = useCallback((id: number) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const deleteItem = useCallback((id: number) => {
        dispatch(removeItem(id));
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });
    }, [dispatch]);

    const deleteSelected = useCallback(() => {
        selectedItems.items.forEach(item => dispatch(removeItem(item.id)));
        setSelectedIds(new Set());
    }, [selectedItems, dispatch]);

    const selectAll = useCallback(() => {
        if (allSelected) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(itemsArray.map(item => item.id)));
        }
    }, [itemsArray, allSelected]);

    return {
        itemsArray,
        selectedIds,
        allSelected,
        totalPrice: allItems.totalPrice,
        totalQuantity: allItems.totalQuantity,
        selectedItems: selectedItems.items,
        selectedTotalPrice: selectedItems.totalPrice,
        selectedTotalQuantity: selectedItems.totalQuantity,
        toggleSelect,
        deleteItem,
        deleteSelected,
        selectAll,
    };
}