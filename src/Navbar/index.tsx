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
  Tabs,
  Container
} from "@chakra-ui/react"
import { FaReceipt, FaUserTie } from 'react-icons/fa';
import OrderContext from "../../context/OrderContext"
import { IProduct } from '../types/types';
import FoodItem from '../Food/FoodItem';
import parseCurrency from '../Food/parseCurrency';
import FoodItemTotalOrder from '../Food/FoodItemTotalOrder';
import orderSend from '../sendOrder';

const Navbar: React.FC = ()=> {
  const { currentOrder, setCurrentOrder, handleAddToTotalOrder, totalOrder, table } = useContext(OrderContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const getTotalItems: (items: IProduct[]) => number = ((items) => items.reduce((counter, item) => counter + item.amount, 0));
  const totalPrice: (items: IProduct[]) => number = ((items) => items.reduce((counter, item) => counter + item.amount * item.price, 0));

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
    const text: string = currentOrder.reduce((message: string, product: IProduct) => message.concat(`* ${product.title} - x${product.amount}\n`), '').concat(`\nsubtotal: ${parseCurrency(totalPrice(currentOrder))}\n`).concat(`\n${table}`);
    orderSend(text)
    onClose()
  }

  const sendCount = ()=>{
    toast({
      title: 'Pidiendo la cuenta',
      description: "En breve el mozo pasará a cobrar",
      status: 'success',
      position: 'top',
      duration: 4000,
      isClosable: true,
    })
    const text: string = totalOrder.reduce((message: string, product: IProduct) => message.concat(`* ${product.title} - x${product.amount}\n`), '').concat(`\nTotal: ${parseCurrency(totalPrice(totalOrder))}\n`).concat(`\n${table}`);
    orderSend(text)
  }

  return(
    <Stack position="fixed" w="100%" bottom={0} bg="gray.700" h="8vh">
      <Container p={0} m={0} maxW="container.sm"h="100%" alignSelf="center">
        <Stack w="100%" h="100%" direction="row" alignItems="center" justifyContent="space-around">
            <Menu placement='top'>
              <MenuButton as={Button} bg="gray.700" colorScheme="black" p={0}>
                <Stack spacing={0} alignItems="center" >
                  <Icon onClick={onOpen} rounded={10} color="gray.200" h={5} w={5} as={FaUserTie} p={0} />
                  <Text fontSize={10} fontWeight={700} color="gray.200">Mozo</Text>
                </Stack>
              </MenuButton>
              <MenuList bg="gray.200">
                <Stack direction='row'>
                  <MenuItem 
                    _focus={{bg: "gray.200"}}
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
                    _focus={{bg: "gray.200"}}
                    w="48%"
                    onClick={sendCount}
                    >Pedir la cuenta</MenuItem>
                </Stack>
              </MenuList>
            </Menu>
            <Button bg="gray.700" onClick={onOpen} colorScheme="black" p={0}>
              <Stack spacing={0} alignItems="center">
                <Icon rounded={10} color="gray.200" h={5} w={5} as={FaReceipt} p={0} />
                <Text fontSize={10} fontWeight={700} color="gray.200">Cuenta</Text>
                {(getTotalItems(currentOrder)
                  ? <Badge position="absolute" top={0} bg="red" rounded="full" color="white" px={2}>{getTotalItems(currentOrder)}</Badge> 
                  : "" )}
              </Stack>
            </Button>
        </Stack>
      </Container>
      <Drawer size="md" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" />
          <DrawerBody color='white' bg="gray.900">
            <Tabs variant='enclosed'>
              <TabList>
                <Tab color="gray.300" bg="gray.700" _selected={{border: "solid 1px", color: 'orange.400', bg: 'gray.900' }}>Pedido actual</Tab>
                <Tab color="gray.300" bg="gray.700" _selected={{border: "solid 1px", color: 'orange.400', bg: 'gray.900' }}>Pedido total</Tab>
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
          <DrawerFooter justifyContent="center" bg="gray.900" flexDirection="column">
            <Stack mb={3} spacing={4} width="100%">
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} color="white" opacity={0.6}>Subtotal:</Heading>
                <Heading fontSize={18} color="white" opacity={0.6}>
                  {parseCurrency(totalPrice(currentOrder))}
                </Heading>
              </HStack>
              <Divider />
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} opacity={0.9} color="orange.400">Total:</Heading>
                <Heading fontSize={18} opacity={0.9} color="orange.400">
                  {parseCurrency(Math.trunc(totalPrice(totalOrder)))}
                </Heading>
              </HStack>
            </Stack>
            <Button isDisabled={(currentOrder.length > 0) ? false : true} colorScheme="orange" w="100%" onClick={sendOrder}>Ordenar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>
  )
}
export default Navbar
