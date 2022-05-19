// API: Implement resolver createTweet with userId from context.user._id (Example in src/graphql/mutations/follower.ts)

import { ForbiddenError } from 'apollo-server-core'
import { ResolverResolveParams, ResolverRpCb } from 'graphql-compose'
import { mergeDeepRight } from 'ramda'
import { TweetTC } from "../../models/tweet"

export const createTweet = TweetTC.getResolver('createOne');
