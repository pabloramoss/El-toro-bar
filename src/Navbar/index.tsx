import React, { useContext } from 'react';
import {
  Icon, 
  Stack, 
  Text, 
  Button, 
  Drawer, 
  DrawerBody, 
  DrawerContent, 
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
  HStack,
  Badge,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react"
import { FaReceipt, FaUserTie } from 'react-icons/fa';
import OrderContext from "../../context/OrderContext"
import { IProduct } from '../types/types';
import FoodItem from '../Food/FoodItem';
import parseCurrency from '../Food/parseCurrency';
import FoodItemTotalOrder from '../Food/FoodItemTotalOrder';

const Navbar: React.FC = ()=> {
  const { currentOrder, setCurrentOrder, handleAddToTotalOrder, totalOrder } = useContext(OrderContext)
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
    currentOrder.map((item: IProduct)=> handleAddToTotalOrder(item))
    setCurrentOrder([])
    onClose()
  }
  const getTotalItems = ((items: IProduct[]) => items.reduce((counter, item) => counter + item.amount, 0));
  const subtotalPrice = ((items: IProduct[]) => items.reduce((counter, item) => counter + item.amount * item.price, 0));
  const totalPrice = ((items: IProduct[]) => items.reduce((counter, item) => ((counter + item.amount * item.price)), 0));

  return(
    <Stack position="fixed" w="100%" bottom={0} bg="teal" h="8vh">
      <Stack w="100%" h="100%" direction="row" alignItems="center" justifyContent="space-around">
        <Stack>
          <Menu placement='top'>
            <MenuButton as={Button} bg="teal" colorScheme="teal" p={0}>
              <Stack spacing={0} alignItems="center" >
                <Icon onClick={onOpen} rounded={10} color="white" h={5} w={5} as={FaUserTie} p={0} />
                <Text fontSize={10} fontWeight={700} color="gray.300">Mozo</Text>
              </Stack>
            </MenuButton>
            <MenuList bg="teal.50">
              <Stack direction='row'>
                <MenuItem 
                  _focus={{bg: "teal.50"}}
                  w="50%" 
                  textAlign="center"
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
                <MenuItem
                  _focus={{bg: "teal.50"}}
                  w="50%"
                  onClick={() =>
                    toast({
                      title: 'Pidiendo la cuenta',
                      description: "En breve el mozo pasará a cobrar",
                      status: 'success',
                      position: 'top',
                      duration: 4000,
                      isClosable: true,
                    })
                  }>Pedir la cuenta</MenuItem>
              </Stack>
            </MenuList>
          </Menu>
        </Stack>
        <Stack alignItems="center" spacing={0}>
          <Button bg="teal" onClick={onOpen} colorScheme="teal" p={0}>
            <Stack spacing={0} alignItems="center">
              <Icon rounded={10} color="white" h={5} w={5} as={FaReceipt} p={0} />
              <Text fontSize={10} fontWeight={700} color="gray.300">Cuenta</Text>
              {(getTotalItems(currentOrder)
                ? <Badge position="absolute" top={0} bg="red" rounded="full" color="white" px={2}>{getTotalItems(currentOrder)}</Badge> 
                : "" )}
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <Drawer size="md" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" />
          <DrawerBody color='white' bg="teal">
            <Tabs variant='enclosed' colorScheme='gray'>
              <TabList>
                <Tab color="teal.100" bg="teal.400" _selected={{border: "solid 1px", color: 'white', bg: 'teal' }}>Pedido actual</Tab>
                <Tab color="teal.100" bg="teal.400" _selected={{border: "solid 1px", color: 'white', bg: 'teal' }}>Pedido total</Tab>
              </TabList>
              <TabPanels p={0}>
                <TabPanel mt={4} p={0}>
                  <Stack spacing={4}>
                    {(currentOrder.length > 0) ? currentOrder.map((product: IProduct) => <FoodItem key={product.title} product={product} />) : <Heading opacity={0.7} fontSize="md" textAlign="center">Agregue productos a su pedido</Heading> }
                  </Stack>
                </TabPanel>
                <TabPanel mt={4} p={0}>
                  <Stack spacing={4}>
                    {totalOrder.map((product: IProduct) => <FoodItemTotalOrder key={product.title} product={product} />)}
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
          <DrawerFooter justifyContent="center" bg="teal" flexDirection="column">
            <Stack mb={3} spacing={4} width="100%">
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} color="white" opacity={0.6}>Subtotal:</Heading>
                <Heading fontSize={18} color="white" opacity={0.6}>
                  {parseCurrency(subtotalPrice(currentOrder))}
                </Heading>
              </HStack>
              <Divider />
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} opacity={0.9} color="white">Total:</Heading>
                <Heading fontSize={18} opacity={0.9} color="white">
                  {parseCurrency(Math.trunc(totalPrice(totalOrder)))}
                </Heading>
              </HStack>
            </Stack>
            <Button isDisabled={(currentOrder.length > 0) ? false : true} colorScheme="gray" w="100%" onClick={sendOrder}>Ordenar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  )
}
export default Navbar
