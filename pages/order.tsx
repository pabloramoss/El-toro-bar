import { Button, Container, Heading, Stack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import MenuCategories from '../src/Food/Categories/MenuCategories';
import FoodCard from '../src/Food/FoodCard';
import Navbar from '../src/Navbar';
import api from "../src/Food/api"
import { GetStaticProps } from 'next';
import { IProduct} from "../src/types/types"
import CategoryContext from "../context/CategoryContext"
import Header from "../src/Header/index"
import OrderContext from '../context/OrderContext';
import { useRouter } from 'next/router';

interface Props {
  products: IProduct[];
}

const Order: React.FC<Props> = ({products})=> {
  const { category } = useContext(CategoryContext)
  const { table } = useContext(OrderContext)
  const router = useRouter()
  const filterProducts = (category === "") ? products : products.filter(product => product.category === category)

  return(
    <Stack spacing={0} justifyContent="center" bg="gray.900">
      <Header />
      <Container
        maxW="container.sm"
        p={2}
        alignSelf="center"
      >
        {(table === "") 
        ? 
        <Stack h="80vh" alignItems="center" spacing={5}>
          <Heading color="white" fontSize="md">Seleccione una mesa primero</Heading>
          <Button w="200px" colorScheme="orange" onClick={()=>router.push("/")}>Volver</Button>
        </Stack>
        :
        <Stack px={3} spacing={5} pb="10vh">
          <MenuCategories />
          {filterProducts.map((product: IProduct) => <FoodCard key={product.id} product={product} />)}
        </Stack>
        }
      </Container>
      <Navbar />
    </Stack>
  )
}
export default Order

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    revalidate: 3600 * 24,
    props: {
      products,
    },
  };
};