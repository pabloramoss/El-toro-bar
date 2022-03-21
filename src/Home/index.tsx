import React from 'react';
import { Button, Select, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Header from "../Header/index"

interface Props {
  setTable: any;
}

const Home: React.FC<Props> = ({ setTable })=> {
  const tables = Array.from({length: 10}, (_, i) => `Mesa ${i + 1}`)
  const router = useRouter()
  const handleSubmit = (e:any) =>{
    e.preventDefault()
    router.push("/order")
  }

  return(
    <Stack bg="gray.900" alignItems="center" h="100vh">
      <Header />
      <Heading fontSize={24} textAlign="center" color="orange.400">Bienvenido a El Torito Bar</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6} mt={5} w="200px">
          <Select bg="white" isRequired onChange={(e)=>setTable(e.target.value)} placeholder='Selecciona una mesa'>
            {tables.map(table=><option key={table} value={table}>{table}</option>)}
          </Select>
          <Button colorScheme="orange" w="200px" type='submit'>Confirmar mesa</Button>
        </Stack>
      </form>
    </Stack>
  )
}
export default Home