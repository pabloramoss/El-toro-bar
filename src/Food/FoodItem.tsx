import { Stack, Image, Heading, Text, Button, Icon } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { IProduct } from "../types/types"
import OrderContext from '../../context/OrderContext';
import parseCurrency from './parseCurrency';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface Props {
  product: IProduct;
}
const FoodItem: React.FC<Props> = ({product})=> {
  const {handleRemoveFromOrder, handleAddToOrder} = useContext(OrderContext)

  return(
    <Stack bg='white' direction="row" rounded={10} boxShadow="lg" w="100%"  h="120px">
      <Image src={product.image} objectFit="cover" h="120px" w="120px" borderLeftRadius={10} alt={product.title} />
      <Stack direction="row" rounded={20} w="100%" h="100%" justifyContent="space-around">
        <Stack spacing={0} w="100%" h="100%" justifyContent="space-around">
          <Heading noOfLines={2} color="black" fontSize="md">{product.title}</Heading>
          <Text noOfLines={2} color="black" fontSize="sm" >{product.description}</Text>
          <Stack direction="row" w="100%" justifyContent="space-between">
            <Heading color="black" fontSize="md">{parseCurrency(product.price)}</Heading>
            <Stack spacing={0} direction="row" rounded="full" boxShadow="lg">
              <Button w="20px" h="30px" colorScheme="teal" borderLeftRadius="9999" boxShadow="lg" fontSize="sm" onClick={()=> handleRemoveFromOrder(product.title)}><Icon as={FaMinus} /></Button>
              <Text px={3} color="black">{product.amount}</Text>
              <Button w="20px" h="30px" colorScheme="teal" borderRightRadius="9999" boxShadow="lg" fontSize="sm" onClick={()=> handleAddToOrder(product)}><Icon w={4} h={4} as={FaPlus} /></Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
export default FoodItem