import { gql, useQuery } from '@apollo/client'
import { Navigate } from 'react-router-dom'

import { AppPageLayout } from '../components/Layout/AppPageLayout'
import { Loading } from '../components/Loading'
import { NewTweet } from '../components/NewTweet'
import { Tweet } from '../components/Tweet'
import { useApp } from '../contexts/AppContext'
import { PageProvider } from '../contexts/PageContext'
import { IQuery } from '../types'

import './FeedPage.css'

// WEB: Implement feed query here
const FEED_QUERY = gql`
query {
  feed {
    _id
    text
    user {
      _id
      fullname
      username
    }
    retweeted
    retweetsCount
    liked
    likesCount
    createdAt
    retweet {
      _id
      text
      user {
        _id
        fullname
        username
      }
      retweeted
      retweetsCount
      liked
      likesCount
      createdAt
    }
  }
}
`

const FeedPage = () => {
  const { user } = useApp()
  // WEB: Implement useQuery for feed query (destruct { data, loading, refetch } from useQuery) with options fetchPolicy: 'network-only' here
  const { data, loading, refetch } = useQuery<IQuery>(FEED_QUERY, { fetchPolicy: 'network-only' })
  if (!user) {
    return (
      <Navigate to="/login" />
    )
  }
  return (
    <PageProvider refetch={refetch}>
      <AppPageLayout>
        <h2 className="feed-title">Feed</h2>
        <NewTweet />
        {loading ? (
          <Loading />
        ) : (
          <div className="feed-tweets" data-testid="tweets">
            {data?.feed?.map((tweet) => (
              <Tweet key={tweet._id as string} tweet={tweet} />
            ))}
          </div>
        )}
      </AppPageLayout>
    </PageProvider>
  )
}

export default FeedPage
