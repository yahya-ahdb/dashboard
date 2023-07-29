import { createContext, useContext, useState } from "react";



export const PaginationContext = createContext({
    pagination:1,
    setPagination: () => {pagination },
})

export const usePagination = () => useContext(PaginationContext)

export const PaginationProvider = ({ children }) => {
    const [pagination, setPagination] = useState(1)
 

   

   
   
    return (
        <PaginationContext.Provider value={{ pagination,setPagination }}>
            {children}
        </PaginationContext.Provider>
    )
}
export default PaginationProvider;