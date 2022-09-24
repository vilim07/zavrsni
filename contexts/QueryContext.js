import { createContext, useState } from "react";

const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState({
        keywords: [""],
        sortBy: "",
      });
    return (
        <QueryContext.Provider value={{searchQuery, setSearchQuery}}>
            {children}
        </QueryContext.Provider>
    )
}

export default QueryContext;