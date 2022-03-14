import React from "react"
import { AppProps } from "next/app"
import { ChakraProvider, VStack, Image, Heading, Text } from '@chakra-ui/react'
import { OrderProvider } from "../context/OrderContext"
import { CategoryProvider } from "../context/CategoryContext"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <ChakraProvider>
      <OrderProvider>
        <CategoryProvider>
          <VStack my={6} spacing={0}>
            <Image rounded="full" src="https://via.placeholder.com/100" alt="bar logo" />
            <Heading fontSize="xl">EL TORO</Heading>
            <Text fontSize="sm">Restaurant a cielo abierto</Text>
          </VStack>
          <Component {...pageProps} />
        </CategoryProvider>
      </OrderProvider>
    </ChakraProvider>
  )
}

export default App