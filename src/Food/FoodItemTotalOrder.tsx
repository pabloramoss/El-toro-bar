import { Stack, Image, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { IProduct } from "../types/types"
import parseCurrency from './parseCurrency';

interface Props {
  product: IProduct;
}
const FoodItemTotalOrder: React.FC<Props> = ({product})=> {

  return(
    <Stack bg='white' direction="row" rounded={10} boxShadow="lg" w="100%"  h="120px">
      <Image src={product.image} objectFit="cover" h="120px" w="120px" borderLeftRadius={10} alt={product.title} />
      <Stack direction="row" rounded={20} w="100%" h="100%" justifyContent="space-around">
        <Stack spacing={0} w="100%" h="100%" justifyContent="space-around">
          <Heading noOfLines={2} color="black" fontSize="md">{product.title}</Heading>
          <Text noOfLines={2} color="black" fontSize="sm" >{product.description}</Text>
          <Stack direction="row" w="100%" justifyContent="space-between" alignItems="center">
            <Heading color="black" fontSize="md">{parseCurrency(product.price)}</Heading>
            <Text px={3} color="black">Cantidad: {product.amount}</Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
export default FoodItemTotalOrder