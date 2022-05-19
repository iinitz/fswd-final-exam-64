import { Link } from 'react-router-dom'

import { ITweet } from '../types'

import './Tweet.css'
import { TweetContent } from './TweetContent'

/* export interface ITweetProps {
  tweet: ITweet
} */
export const Tweet = ({ tweet }) => (
  <div className="tweet" data-testid={`tweet-${tweet._id}`}>
    {tweet.retweet && (
      <div className="tweet-retweet">
        <Link to={`/${tweet.user?.username ?? ''}`} data-testid={`tweet-${tweet._id}-retweet`}>
          {tweet.user?.fullname} Retweeted
        </Link>
      </div>
    )}
    {tweet.retweet ? (
      <TweetContent tweet={tweet.retweet} />
    ) : (
      <TweetContent tweet={tweet} />
    )}
  </div>
)
