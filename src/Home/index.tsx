import React, { useContext, useState } from 'react';
import { Button, Select, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import OrderContext from '../../context/CategoryContext';
import Header from "../Header/index"

const Home: React.FC = ()=> {
  const tables = Array.from({length: 10}, (_, i) => `Mesa ${i + 1}`)
  const [selectedTable, setSelectedTable] = useState<string>("Selecione una mesa")
  const router = useRouter()
  const handleSubmit = (e:any) =>{
    e.preventDefault()
    router.push("/order")
    console.log(selectedTable)
  }
  return(
    <Stack bg="teal.50" alignItems="center" h="100vh">
      <Header />
      <Heading fontSize={24} textAlign="center">Bienvenido a El Torito Bar</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6} mt={5} w="200px">
          <Select bg="white" isRequired onChange={(e)=>setSelectedTable(e.target.value)} placeholder='Selecciona una mesa'>
            {tables.map(table=><option key={table} value={table}>{table}</option>)}
          </Select>
          <Button colorScheme="teal" w="200px" type='submit'>Confirmar mesa</Button>
        </Stack>
      </form>
    </Stack>
  )
}
export default Home