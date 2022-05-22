export const graphql = <TData, TVariables = object | undefined>(query: string, variables?: TVariables): Promise<TData> => new Promise((resolve) => {
  cy
    .request({
      method: 'POST',
      url: 'https://api.fswd64.devnss.com/graphql',
      body: {
        query,
        variables,
      },
    })
    .its('body.data')
    .then((data: TData) => resolve(data))
})
