import React, { useState } from 'react';
import { Button, Select, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

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
    <>
      <Heading textAlign="center">Bienvenido a El Toro Wireless Bar</Heading>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Select isRequired onChange={(e)=>setSelectedTable(e.target.value)} placeholder='Selecciona una mesa'>
            {tables.map(table=><option key={table} value={table}>{table}</option>)}
          </Select>
          <Button type='submit'>Confirmar mesa</Button>
        </Stack>
      </form>
    </>
  )
}
export default Home