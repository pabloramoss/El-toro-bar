import React, { useContext } from 'react';
import FoodItem from '../Food/FoodItem';
import OrderContext from '../../context/OrderContext';
import { IProduct } from '../types/types';

function Order() {
  const { currentOrder } = useContext(OrderContext)
  
  return (
    <>
      {currentOrder.map((product: IProduct) => (
        <FoodItem
          key={product.title}
          product={product}
        />
      ))}
    </>
  );
}

export default Order;
