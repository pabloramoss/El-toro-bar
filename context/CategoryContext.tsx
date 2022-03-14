import { createContext, useState } from "react"

const CategoryContext:any = createContext({})
const CategoryProvider: React.FC<React.ReactNode> = ({children}) => {
  const [category, setCategory] = useState<string>("")

  const data = {
    category, 
    setCategory,
  }
  return (
    <CategoryContext.Provider value={data}>{children}</CategoryContext.Provider>
  )
}

export {CategoryProvider}
export default CategoryContext
