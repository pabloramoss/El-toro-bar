import { VStack, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';

const Header: React.FC = ()=> {

  return(
    <VStack py={6} spacing={0} bg="gray.900">
      <Image rounded="full" src="/logo.png" h="100px" bg="gray.800" w="100px" alt="El torito logo" />
        <Heading fontSize="xl" color="orange.400">EL TORITO</Heading>
        <Text fontSize="sm" color="orange.400">Bar a cielo abierto</Text>
    </VStack>
  )
}
export default Header