import { Link } from 'react-router-dom'

import './Tweet.css'
import { TweetContent } from './TweetContent'

export const Tweet = ({ tweet }) => (
  <div className="tweet" data-testid={`tweet-${tweet._id || null}`}>
    {tweet.retweet && (
      <div className="tweet-retweet">
        <Link to={`/${tweet.user?.username ?? ''}`} data-testid={`tweet-${tweet._id || null}-retweet`}>
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
