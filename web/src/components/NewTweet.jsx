import { gql } from '@apollo/client'
import { useCallback, useState } from 'react'

import { MAX_TWEET_LENGTH } from '../constants'
import { useApp } from '../contexts/AppContext'
import { usePage } from '../contexts/PageContext'
// import { ICreateOneTweetInput } from '../types'

import { Avatar } from './Avatar'
import './NewTweet.css'

// WEB: Implement createTweet mutation here
const CREATE_TWEET_MUTATION = gql`
  mutation ($record: CreateOneTweetInput!) {
    createTweet (record: $record) {
      record {
        _id
      }
    }
  }
`

export const NewTweet = () => {
  const { user } = useApp()
  const { refetch } = usePage()
  // WEB: Implement text state here
  const [text, setText] = useState('')
  // WEB: Implement useMutation for createTweetMutation here
  // WEB: Implement useCallback for handleTextChange with condition text length <= MAX_TWEET_LENGTH here
  const handleCreateTweet = useCallback(
    async () => {
      const record = {
        text,
      }
      try {
        const { data } = await createTweetMutation({ variables: { record } })
        if (createTweetData?.createTweet?.recordId) {
          setText('')
          await refetch()
        }
      } catch (err) {
        console.error(err)
      }
    },
    [createTweetMutation, refetch, text],
  )
  return (
    <div className="new-tweet">
      <div className="new-tweet-avatar">
        <Avatar username={user?.username ?? 'A'} />
      </div>
      <div className="new-tweet-form">
        <div className="new-tweet-input">
          {/* WEB: Implement textarea with text state here */}
          <textarea
            data-testid="new-tweet-input"
            placeholder="What's happening?"
            onChange={(e) => { setText(e.target.value) }}
          />
        </div>
        <div className="new-tweet-actions">
          <span className="new-tweet-length" data-testid="new-tweet-length">{text.length}/{MAX_TWEET_LENGTH}</span>
          {/* WEB: Implement Tweet button call handleCreateTweet when click and disabled when text length = 0 here */}
          <button
            type="button"
            data-testid="new-tweet-button"
            onClick={handleCreateTweet}
            disabled={text.length != 0}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}
