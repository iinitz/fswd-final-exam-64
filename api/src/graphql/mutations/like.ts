// API: Implement resolver like with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
export const like = ILike.mongooseResolverscreateOne({ record: { removeFields: ['_id', 'userId', 'createdAt', 'updatedAt'] } }).wrapResolve((next: ResolverRpCb<IFollower, IApolloContext>) => (rp: ResolverResolveParams<IFollower, IApolloContext>)

// API: Implement resolver unlike with userId from context.user._id (Example in src/graphql/mutations/follower.ts)
