import { Container, Stack } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import MenuCategories from '../src/Food/Categories/MenuCategories';
import FoodCard from '../src/Food/FoodCard';
import Navbar from '../src/Navbar';
import api from "../src/Food/api"
import { GetStaticProps } from 'next';
import { IProduct} from "../src/types/types"
import CategoryContext from "../context/CategoryContext"
import Header from "../src/Header/index"

interface Props {
  products: IProduct[];
}

const Order: React.FC<Props> = ({products})=> {
  const {category} = useContext(CategoryContext)
  useEffect(()=>{
    console.log(category)
  },[category])
  const filterProducts = (category === "") ? products : products.filter(product => product.category === category)

  return(
    <Stack spacing={0}>
      <Header />
      <Container
        bg="teal.50"
        boxShadow='lg'
        maxW="container.xl"
        p={2}
      >
        <Stack px={3} spacing={5} pb="10vh">
          <MenuCategories />
          {filterProducts.map((product: IProduct) => <FoodCard key={product.id} product={product} />)}
        </Stack>
      </Container>
      <Navbar />
    </Stack>
  )
}
export default Order

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
/*     revalidate: 3600 * 24,
 */    props: {
      products,
    },
  };
};