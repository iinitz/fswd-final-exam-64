/* eslint-disable */
import { gql, useMutation } from '@apollo/client'
import { useCallback, useState } from 'react'

import { MAX_TWEET_LENGTH } from '../constants'
import { useApp } from '../contexts/AppContext'
import { usePage } from '../contexts/PageContext'
import { ICreateOneTweetInput } from '../types'

import { Avatar } from './Avatar'
import './NewTweet.css'

// WEB: Implement createTweet mutation here
const CREATE_TWEET_MUTATION = gql`
  mutation newTweet($text: String!){
    createTweet(text : $text){
      text
    }
  }
`

export const NewTweet = () => {
  const { user } = useApp()
  const { refetch } = usePage()
  const [text, setText] = useState<string>('')
  // WEB: Implement text state here
  // WEB: Implement useMutation for createTweetMutation here
  const [createTweetMutation] = useMutation(CREATE_TWEET_MUTATION)
  // WEB: Implement useCallback for handleTextChange with condition text length <= MAX_TWEET_LENGTH here
  const handleTextChange = useCallback((e : React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_TWEET_LENGTH) {
      setText(e.target.value)
    }
  }, [])
  const handleCreateTweet = useCallback(
    async () => {
      const record: ICreateOneTweetInput = {
        text,
      }
      try {
        const { data: createTweetData } = await createTweetMutation({ variables: { ...record } })
        if (createTweetData?.createTweet?.text) {
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
            value={text}
            onChange={handleTextChange}
            data-testid="new-tweet-input"
            placeholder="What's happening?"
          />
        </div>
        <div className="new-tweet-actions">
          <span className="new-tweet-length" data-testid="new-tweet-length">{text.length}/{MAX_TWEET_LENGTH}</span>
          {/* WEB: Implement Tweet button call handleCreateTweet when click and disabled when text length = 0 here */}
          <button
            onClick={handleCreateTweet}
            type="button"
            data-testid="new-tweet-button"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}
