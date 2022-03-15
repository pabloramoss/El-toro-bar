import { VStack, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = ()=> {

  return(
    <VStack py={6} spacing={0} bg="teal.50">
      <Image rounded="full" src="/logo.jpg" h="100px" w="100px" alt="El torito logo" />
        <Heading fontSize="xl">EL TORITO</Heading>
        <Text fontSize="sm">Bar a cielo abierto</Text>
    </VStack>
  )
}
export default Header