import { Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useContext } from 'react'
import OrderContext from '../context/OrderContext'
import Home from '../src/Home/index'

const IndexPage: NextPage = () => {
  const { setTable } = useContext(OrderContext)

  return (
    <Stack height="100vh">
      <Home setTable={setTable} />
    </Stack>
  )
}

export default IndexPage
