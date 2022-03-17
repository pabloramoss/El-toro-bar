import React from "react"
import { AppProps } from "next/app"
import { ChakraProvider } from '@chakra-ui/react'
import { OrderProvider } from "../context/OrderContext"
import { CategoryProvider } from "../context/CategoryContext"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <ChakraProvider>
      <OrderProvider>
        <CategoryProvider>
          <Component {...pageProps} />
        </CategoryProvider>
      </OrderProvider>
    </ChakraProvider>
  )
}

export default App