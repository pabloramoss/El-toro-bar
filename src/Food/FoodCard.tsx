import { Stack, Image, Heading, Text, Button } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { IProduct } from "../types/types"
import parseCurrency from './parseCurrency';
import OrderContext from "../../context/OrderContext"

interface Props {
  product: IProduct;
}
const FoodCard: React.FC<Props> = ({product})=> {
  const {handleAddToOrder} = useContext(OrderContext)

  return(
    <Stack bg='white' direction="row" rounded={10} boxShadow="lg" w="100%" h="120px">
      <Image borderLeftRadius={10} src={product.image} objectFit="cover" h="120px" w="120px" alt={product.title} />
      <Stack direction="row" rounded={20} w="100%" h="100%">
        <Stack spacing={0} w="100%" h="100%" justifyContent="space-around">
          <Heading noOfLines={2} fontSize="md">{product.title}</Heading>
          <Text noOfLines={2} fontSize="sm" >{product.description}</Text>
          <Stack direction="row" w="100%" alignSelf="end" justifyContent="space-between" alignItems="center">
            <Heading fontSize="md">{parseCurrency(product.price)}</Heading>
            <Button 
              justifySelf="end"
              size="sm" 
              alignSelf="end"
              minW={20} 
              colorScheme="teal" 
              rounded="full" 
              boxShadow="lg" 
              fontSize="sm" 
              onClick={()=> handleAddToOrder(product)}>Añadir
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
export default FoodCard