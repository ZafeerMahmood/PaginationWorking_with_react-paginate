import * as React from 'react'
import { IPost } from '../types'

type Props = {
  savePost: (e: React.FormEvent, formData: IPost) => void
}

const AddPost: React.FC<Props> = ({ savePost }) => {
  const [formData, setFormData] = React.useState<IPost>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData as IPost,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='bg-[#fff] rounded-3xl p-[1rem] mb-[1rem] ' onSubmit={(e) => savePost(e, formData as IPost)}>
      <div>
        <div className='m-auto w-[60%]'>
          <label className='mb-[1rem]' htmlFor='name'>Title</label>
          <input className='border-sky-800 border-[1px] px-2 py-4 rounded-[10px] w-[100%] block outline-none border-solid' onChange={handleForm} type='text' id='title' />
        </div>
        <div className='m-auto w-[60%]'>
          <label  className='mb-[1rem]' htmlFor='body'>Description</label>
          <input className='border-sky-800 border-[1px] px-2 py-4 rounded-[10px] w-[100%] block outline-none border-solid' onChange={handleForm} type='text' id='body' />
        </div>
      </div>
      <button
        className=' block m-auto text-[#fff] bg-sky-800 w-1/3'
        disabled={formData === undefined ? true : false}
      >
        Add Post
      </button>
    </form>
  )
}

export default AddPost

