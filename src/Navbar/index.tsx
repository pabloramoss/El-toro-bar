import React, { useContext } from 'react';
import {
  Icon, 
  Stack, 
  Text, 
  Button, 
  Drawer, 
  DrawerBody, 
  DrawerContent, 
  DrawerHeader, 
  DrawerOverlay, 
  useDisclosure, 
  DrawerCloseButton, 
  DrawerFooter, 
  Menu, 
  MenuButton, 
  MenuItem, 
  MenuList, 
  useToast,
  Divider,
  Heading,
  HStack
} from "@chakra-ui/react"
import { FaReceipt, FaUtensils, FaUserTie } from 'react-icons/fa';
import OrderContext from "../../context/OrderContext"
import { IProduct } from '../types/types';
import FoodItem from '../Food/FoodItem';
import parseCurrency from '../Food/parseCurrency';

const Navbar: React.FC = ()=> {
  const {currentOrder} = useContext(OrderContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const sendOrder = ()=> {
    toast({
      title: 'Orden enviada',
      status: 'success',
      position: 'top',
      duration: 4000,
      isClosable: true,
    })
    onClose()
  }
  const getTotalItems = ((items: IProduct[]) => items.reduce((counter, item) => counter + item.amount, 0));
  const subtotalPrice = ((items: IProduct[]) => items.reduce((counter, item) => counter + item.amount * item.price, 0));
  const totalPrice = ((items: IProduct[]) => items.reduce((counter, item) => ((counter + item.amount * item.price)), 0)); //agregar precio de totalOrder

  return(
    <Stack position="fixed" w="100%" bottom={0} bg="teal" h="8vh">
      <Stack w="100%" h="100%" direction="row" alignItems="center" justifyContent="space-around">
        <Stack alignItems="center" spacing={0}>
          <Icon p={2} color="white" h={8} w={8} as={FaUtensils} />
          <Text fontSize={10} fontWeight={700} color="gray.300">Menu</Text>
        </Stack>
        <Stack>
          <Menu placement='top'>
            <MenuButton bg="teal">
              <Stack spacing={0}>
                <Icon onClick={onOpen} p={2} rounded={10} color="white" h={8} w={8} as={FaUserTie} />
                <Text fontSize={10} fontWeight={700} color="gray.300">Mozo</Text>
              </Stack>
            </MenuButton>
            <MenuList>
              <Stack direction='row'>
                <MenuItem w="50%" textAlign="center"      
                  onClick={() =>
                    toast({
                      title: 'Llamando al mozo',
                      description: "En unos momentos será atendido",
                      status: 'success',
                      position: 'top',
                      duration: 4000,
                      isClosable: true,
                    })
                  }>Llamar al mozo</MenuItem>
                <MenuItem>Pedir la cuenta</MenuItem>
              </Stack>
            </MenuList>
          </Menu>
        </Stack>
        <Stack alignItems="center" spacing={0}>
          <Icon 
            onClick={onOpen} 
            p={2} 
            rounded={10} 
            color="white" 
            h={8} 
            w={8} 
            as={FaReceipt} 
          />
          <Text fontSize={10} fontWeight={700} color="gray.300">Cuenta</Text>
        </Stack>
      </Stack>
      <Drawer size="md" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" />
          <DrawerHeader 
            color='white' 
            bg="teal" 
            textAlign="center" 
            fontSize={25}
          >Tu pedido</DrawerHeader>
          <DrawerBody color='white' bg="teal">
            <Stack spacing={4}>
              {currentOrder.map((product: IProduct) => <FoodItem key={product.title} product={product} />)}
            </Stack>
          </DrawerBody>
          <DrawerFooter justifyContent="center" bg="teal" flexDirection="column">
            <Stack my={3} spacing={4} width="100%">
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} opacity={0.6}>Subtotal:</Heading>
                <Heading fontSize={18} opacity={0.6}>
                  {parseCurrency(subtotalPrice(currentOrder))}
                </Heading>
              </HStack>
              <Divider />
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} opacity={0.9}>Total:</Heading>
                <Heading fontSize={18} opacity={0.9}>
                  AR
                  {parseCurrency(Math.trunc(totalPrice(currentOrder)))}
                </Heading>
              </HStack>
            </Stack>
            <Button colorScheme="gray" w="100%" onClick={sendOrder}>Ordenar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  )
}
export default Navbar