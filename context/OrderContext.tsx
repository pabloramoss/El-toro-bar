import { createContext, useState, useEffect } from "react"
import { IProduct } from "../src/types/types"

const OrderContext:any = createContext({})

const OrderProvider: React.FC<React.ReactNode> = ({children}) => {
  const [currentOrder, setCurrentOrder] = useState<IProduct[]>([])
  const [totalOrder, setTotalOrder] = useState<IProduct[]>([])
  const [table, setTable] = useState("")
  
  const handleAddToTotalOrder = (clickedItem: IProduct) => {
    setTotalOrder((prev) => {
      // 1. Is the item already added in the order?
      const isItemInOrder = prev.find((item) => item.title === clickedItem.title);
      if (isItemInOrder) {
        return prev.map((item) => (item.title === clickedItem.title
          ? { ...item, amount: item.amount + clickedItem.amount }
          : item));
      }
      // First time the item is added
      return [...prev, { ...clickedItem}];
    });
  };
  
  const handleAddToOrder = (clickedItem: IProduct) => {
    setCurrentOrder((prev) => {
      // 1. Is the item already added in the order?
      const isItemInOrder = prev.find((item) => item.title === clickedItem.title);
      if (isItemInOrder) {
        return prev.map((item) => (item.title === clickedItem.title
          ? { ...item, amount: item.amount + 1 }
          : item));
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  
  const handleRemoveFromOrder = (title: string) => {
    setCurrentOrder(prev =>
      prev.reduce((counter, item) => {
        if (item.title === title) {
          if (item.amount === 1) return counter;
          return [...counter, { ...item, amount: item.amount - 1 }];
        } else {
          return [...counter, item];
        }
      }, [] as IProduct[])
    );
  };
  const data = {
    currentOrder, 
    setCurrentOrder,
    table,
    setTable,
    totalOrder,
    setTotalOrder,
    handleAddToOrder,
    handleRemoveFromOrder,
    handleAddToTotalOrder,
  }
  return (
    <OrderContext.Provider value={data}>{children}</OrderContext.Provider>
  )
}

export {OrderProvider}
export default OrderContext
