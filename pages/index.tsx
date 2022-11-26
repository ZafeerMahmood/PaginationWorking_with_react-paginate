import * as React from "react";
import { InferGetStaticPropsType } from "next";
import AddPost from "../components/addPost";
import Post from "../components/Post";
import { IPost } from "../types";
import ReactPaginate from "react-paginate";
import Items from "../components/items";
import { HtmlProps } from "next/dist/shared/lib/html-context";
import { type } from "os";

const BASE_URL: string = "https://jsonplaceholder.typicode.com/posts";

export default function IndexPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [postList, setPostList] = React.useState(posts);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  const handlePageClick = (e: any) => {
    const newOffset = (e.selected * itemsPerPage) % posts.length;
    console.log(
      `User requested page number ${e.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const addPost = async (e: React.FormEvent, formData: IPost) => {
    e.preventDefault();
    const post: IPost = {
      id: Math.random(),
      title: formData.title,
      body: formData.body,
    };
    setPostList([post, ...postList]);
  };

  const deletePost = async (id: number) => {
    const posts: IPost[] = postList.filter((post: IPost) => post.id !== id);
    console.log(`hekki ${id}`)
    setPostList(posts);
  };

  if (!postList) return <h1>Loading...</h1>;

  return (
    <main className=" flex flex-col m-auto p-8 max-w-[820px]">
      <h1 className=" items-center uppercase mb-[1rem] text-3xl m-auto text-white">
        Home
      </h1>
      <AddPost savePost={addPost} />

      <Items postList={currentItems} deletePost={deletePost} />
      <div className="m-auto">
        <nav aria-label="">
          <ul className="">
            <li className=" ">
              <ReactPaginate
                activeClassName={'block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-sky-700 hover:bg-gray-100 hover:text-gray-700 '}
                breakClassName={'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                containerClassName={'inline-flex items-center -space-x-px'}
                disabledClassName={'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                nextClassName={'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                pageClassName={' px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                previousClassName={"px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
              />
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch(BASE_URL);
  const posts: IPost[] = await res.json();

  return {
    props: {
      posts,
    },
  };
}
