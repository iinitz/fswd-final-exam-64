export * from '../generated/graphql'

export interface ICreateOneUserInput {
  fullname: string
  username: string
  password: string
}
export interface ICreateOneTweetInput {
  text: string
}

export interface ICreateOneLikeInput {
  tweetId: string
}

export interface IFilterRemoveOneLikeInput {
  tweetId: string
}
