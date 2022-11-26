
import * as React from 'react'
import { IPost } from '../types'

type Props = {
  post: IPost // Post Type
  deletePost: (id: number) => void // Funtion to delete post
}

const Post: React.FC<Props> = ({ post, deletePost }) => {
  return (
    <div className='bg-[#fff] p-8 mb-[1rem] flex items-center justify-between rounded-3xl'>
      <div className='w-[60%]'>
        <h1 className='text-[#999]'>{post.title}</h1>
        <p className='text-[#999]'>{post.body}</p>
      </div>
      <button className='bg-[#fff] border-[1px] border-solid border-sky-700 text-sky-700 ' onClick={() => {deletePost(post.id)}}>
        Delete
      </button>
    </div>
  )
}

export default Post