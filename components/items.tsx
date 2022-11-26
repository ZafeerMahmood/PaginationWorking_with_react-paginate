import * as React from 'react'
import { IPost } from '../types'
import Post from './Post'

type Props = {
    postList: IPost[] // Post Type
    deletePost: (id: number) => void // Funtion to delete post
  }
  
  const Items: React.FC<Props> = ({ postList, deletePost }) => {
  
    return (
          <>
            {postList && postList.map((postList: IPost) => (
            <Post key={postList.id} deletePost={deletePost} post={postList} />
          ))}
        </>
  
    )
  }
  
  export default  Items