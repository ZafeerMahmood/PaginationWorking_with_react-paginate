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
  const [currentItems,setCurrentItems] = React.useState(posts.slice(itemOffset, endOffset));
  const [pageCount,setPageCount] = React.useState(Math.ceil(posts.length / itemsPerPage));


  React.useEffect(() => {
    setCurrentItems(postList.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(postList.length / itemsPerPage))
  }, [endOffset, itemOffset, itemsPerPage, postList]);

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
      <h1 className=" items-center uppercase mb-[1rem] text-3xl m-auto text-white bg-">
        Home
      </h1>
      <AddPost savePost={addPost} />

      <Items postList={currentItems} deletePost={deletePost} />
      <div className="m-auto">  
              <ReactPaginate
                activeClassName={'pagination font-bold text-sky-700  block px-4 py-2 ml-0'}
                breakClassName={'pagination'}
                containerClassName={'flex flex-row'}
                disabledClassName={'pagination'}
                nextClassName={'pagination rounded-r-lg font-bold'}
                pageClassName={' pagination'}
                previousClassName={"pagination rounded-l-lg font-bold"}
                breakLabel="..."
                nextLabel="next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="pervious"
              />
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
