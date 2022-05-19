import { gql, useMutation } from '@apollo/client'
import moment from 'moment'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { useApp } from '../contexts/AppContext'
import { usePage } from '../contexts/PageContext'
import { plural } from '../lib/utils'

import { Avatar } from './Avatar'
import './TweetContent.css'

// WEB: Implement retweet mutation here
const RETWEET_MUTATION = gql`
`
// WEB: Implement like mutation here
const LIKE_MUTATION = gql`
  mutation ($record: CreateOneLikeInput!) {
    like (record: $record) {
      record {
        userId
      }
    }
  }
`
// WEB: Implement unlike mutation here
const UNLIKE_MUTATION = gql`
  mutation ($filter: FilterRemoveOneLikeInput!) {
    unlike (filter: $filter) {
      record {
        userId
      }
    }
  }
`

export const TweetContent = ({ tweet }) => {
  const { user } = useApp()
  const { refetch } = usePage()
  // WEB: Implement useMutation for retweetMutation, likeMutation, unlikeMutation here
  const [retweetMutation] = useMutation(RETWEET_MUTATION)
  const [likeMutation] = useMutation(LIKE_MUTATION)
  const [unlikeMutation] = useMutation(UNLIKE_MUTATION)
  const handleRetweet = useCallback(
    async () => {
      const record = {
        retweetId: tweet._id,
      }
      try {
        await retweetMutation({ variables: { record } })
        await refetch()
      } catch (err) {
        console.error(err)
      }
    },
    [refetch, retweetMutation, tweet._id, tweet.text, tweet.user?.username],
  )
  const handleLike = useCallback(
    async () => {
      const record = {
        tweetId: tweet._id,
      }
      try {
        await likeMutation({ variables: { record } })
        await refetch()
      } catch (err) {
        console.error(err)
      }
    },
    [likeMutation, refetch, tweet._id],
  )
  const handleUnlike = useCallback(
    async () => {
      const filter = {
        tweetId: tweet._id,
      }
      try {
        await unlikeMutation({ variables: { filter } })
        await refetch()
      } catch (err) {
        console.error(err)
      }
    },
    [refetch, tweet._id, unlikeMutation],
  )
  return (
    <div className="tweet-root">
      <Avatar username={tweet.user?.username ?? 'A'} />
      <div className="tweet-content">
        <div className="tweet-info">
          <span className="tweet-fullname">
            <Link to={`/${tweet.user?.username ?? ''}`} data-testid={`tweet-${tweet._id}-fullname`}>
              {tweet.user?.fullname ?? 'Fullname'}
            </Link>
          </span>
          <span className="tweet-username">
            <Link to={`/${tweet.user?.username ?? ''}`} data-testid={`tweet-${tweet._id}-username`}>
              @{tweet.user?.username ?? 'username'}
            </Link>
          </span>
          <span>·</span>
          <span className="tweet-timestamp" data-testid={`tweet-${tweet._id}-timestamp`}>{moment(tweet.createdAt).fromNow()}</span>
        </div>
        <div
          className="tweet-text"
          data-testid={`tweet-${tweet._id}-text`}
        >
          {tweet.text}
        </div>
        <div className="tweet-actions">
          {tweet.retweeted ? (
            <button
              className="tweet-retweet-button tweet-retweeted"
              type="button"
              onClick={handleRetweet}
              data-testid={`tweet-${tweet._id}-retweeted-button`}
              disabled={!user}
            >
              <span data-testid={`tweet-${tweet._id}-retweet-count`}>{tweet.retweetsCount ?? 0}</span> {plural(tweet.retweetsCount ?? 0, 'Retweet')}
            </button>
          ) : (
            <button
              className="tweet-retweet-button"
              type="button"
              onClick={handleRetweet}
              data-testid={`tweet-${tweet._id}-retweet-button`}
              disabled={!user}
            >
              <span data-testid={`tweet-${tweet._id}-retweet-count`}>{tweet.retweetsCount ?? 0}</span> {plural(tweet.retweetsCount ?? 0, 'Retweet')}
            </button>
          )}
          {tweet.liked ? (
            <button
              className="tweet-like-button tweet-liked"
              type="button"
              onClick={handleUnlike}
              data-testid={`tweet-${tweet._id}-unlike-button`}
              disabled={!user}
            >
              <span data-testid={`tweet-${tweet._id}-like-count`}>{tweet.likesCount ?? 0}</span> {plural(tweet.likesCount ?? 0, 'Like')}
            </button>
          ) : (
            <button
              className="tweet-like-button"
              type="button"
              onClick={handleLike}
              data-testid={`tweet-${tweet._id}-like-button`}
              disabled={!user}
            >
              <span data-testid={`tweet-${tweet._id}-like-count`}>{tweet.likesCount ?? 0}</span> {plural(tweet.likesCount ?? 0, 'Like')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
