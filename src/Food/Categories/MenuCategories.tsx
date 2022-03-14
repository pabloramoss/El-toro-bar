import { Select, Heading, Stack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import CategoryContext from '../../../context/CategoryContext';

const MenuCategories: React.FC = ()=> {
  const {setCategory} = useContext(CategoryContext)
  const categories = ["Comidas", "Bebidas sin alcohol", "Bebidas con alcohol", "Postres", "Guarniciones"]

  return(
    <Stack>
      <Heading fontSize="lg">Haz tu pedido:</Heading>
      <Select 
        bg="white" 
        mt={10} 
        isRequired 
        onChange={(e)=>setCategory(e.target.value)} 
        placeholder='Todos los productos'>
          {categories.map(category=><option key={category} value={category}>{category}</option>)}
      </Select>
    </Stack>
  )
}

export default MenuCategories