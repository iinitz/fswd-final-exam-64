import { ApolloQueryResult } from '@apollo/client'
import { createContext, useContext, useMemo } from 'react'

import { IQuery } from '../types'

export interface{
  refetch: () => Promise<ApolloQueryResult<IQuery>>
}
export const PageContext = createContext<IPageContext>({})

export interface {
  children: React.ReactNode
  refetch: () => Promise<ApolloQueryResult<IQuery>>
}
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
