import { ApolloQueryResult } from '@apollo/client'
import { createContext, useContext, useMemo } from 'react'

import { IQuery } from '../types'


export const PageContext = createContext<IPageContext>({})


export const PageProvider = ({ children, refetch }) => {
  const value = useMemo(
    () => ({
      refetch,
    }),
    [refetch],
  )
  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  )
}
export const usePage = () => useContext(PageContext)
