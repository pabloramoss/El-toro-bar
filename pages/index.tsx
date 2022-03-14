import { Stack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import MenuCategories from '../src/Food/Categories/MenuCategories'
import FoodCard from '../src/Food/FoodCard'
import Navbar from "../src/Navbar/index"
import Tables from '../src/Tables'
import Home from '../src/Home/index'

const IndexPage: NextPage = () => {
  return (
    <Stack height="100vw">
      <Home />
    </Stack>
  )
}

export default IndexPage
