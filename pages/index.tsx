import { Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Home from '../src/Home/index'

const IndexPage: NextPage = () => {
  return (
    <Stack height="100vh">
      <Home />
    </Stack>
  )
}

export default IndexPage
