import {
  Button, 
  Divider, 
  Drawer, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerOverlay, 
  Flex, 
  Heading,
  HStack, 
  Icon, 
  Stack, 
  useDisclosure, 
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import parseCurrency from '../Food/parseCurrency';
import Order from "./Order"
import OrderContext from '../../context/OrderContext';
import { IProduct } from '../types/types';

function OrderList() {
  const { currentOrder } = useContext(OrderContext)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getTotalItems = ((items: IProduct[]) => items.reduce((counter, item) => counter + item.amount, 0));
  const subtotalPrice = ((items: IProduct[]) => items.reduce((counter, item) => counter + item.amount * item.price, 0));
  const totalPrice = ((items: IProduct[]) => items.reduce((counter, item) => ((counter + item.amount * item.price + (item.amount * item.price))), 0));

  return (
    <Flex>
      <VStack width="100vw">
        <Button top={['85vh', '85vh', '85vh', '90vh']} position="absolute" colorScheme="teal" px={8} onClick={onOpen}>
          <Icon as={FaShoppingCart} me={5} />
          Tu pedido (
          {getTotalItems(currentOrder)}
          )
        </Button>
      </VStack>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader alignSelf="center">
            Pedido (
            {getTotalItems(currentOrder)}
            )
          </DrawerHeader>
          <DrawerBody>
            <Order/>
          </DrawerBody>
          <Divider />
          <DrawerFooter justifyContent="center" flexDirection="column">
            <Stack my={3} spacing={4} width="100%">
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} opacity={0.6}>Subtotal:</Heading>
                <Heading fontSize={18} opacity={0.6}>
                  {parseCurrency(subtotalPrice(currentOrder))}
                </Heading>
              </HStack>
              <Divider />
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} opacity={0.5}>Total:</Heading>
                <Heading fontSize={18} opacity={0.5}>
                  {parseCurrency(totalPrice(currentOrder))}
                </Heading>
              </HStack>
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18}>Total:</Heading>
                <Heading fontSize={18}>
                  AR
                  {parseCurrency(Math.trunc(totalPrice(currentOrder)))}
                </Heading>
              </HStack>
            </Stack>
            <Link href="/UserForm" passHref>
              <Button width="100%" colorScheme="green">Completar pedido</Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default OrderList;