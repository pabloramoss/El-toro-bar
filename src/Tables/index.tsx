import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import React, {useState} from 'react';
import { FaChevronCircleDown } from 'react-icons/fa';

const Tables: React.FC = ()=> {
  const [selectedTable, setSelectedTable] = useState("Selecione una mesa")
  const tables = ["Mesa 1", "Mesa 2", "Mesa 3", "Mesa 4", ]

  return(
    <Menu>
      <MenuButton as={Button} rightIcon={<FaChevronCircleDown />}>
        {selectedTable}
      </MenuButton>
      <MenuList>
        {tables.map(table=> <MenuItem onClick={()=>setSelectedTable(table)} key={table}>{table}</MenuItem>)}
      </MenuList>
    </Menu>
  )
}
export default Tables