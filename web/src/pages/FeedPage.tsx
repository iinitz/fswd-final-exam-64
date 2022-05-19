/* eslint-disable */

import { gql, useQuery } from '@apollo/client'
import { Navigate } from 'react-router-dom'

import { AppPageLayout } from '../components/Layout/AppPageLayout'
import { Loading } from '../components/Loading'
import { NewTweet } from '../components/NewTweet'
import { Tweet } from '../components/Tweet'
import { useApp } from '../contexts/AppContext'
import { PageProvider } from '../contexts/PageContext'
import { ITweet } from '../types'

import './FeedPage.css'

// WEB: Implement feed query here
const FEED_QUERY = gql`
  query Feed{
    feed{
      text
      user{
        username
        fullname
      }
      retweet{
        text
      }
      _id
      likesCount
      liked
    }
  }
`

const FeedPage = () => {
  const { user } = useApp()
  const { data, loading, refetch } = useQuery(FEED_QUERY, {
    fetchPolicy: 'network-only',
  })
  console.log(data)
  // WEB: Implement useQuery for feed query (destruct { data, loading, refetch } from useQuery) with options fetchPolicy: 'network-only' here
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
            {data?.feed?.map((tweet : ITweet) => (
              <Tweet key={tweet._id as string} tweet={tweet} />
            ))}
          </div>
        )}
      </AppPageLayout>
    </PageProvider>
  )
}

export default FeedPage
