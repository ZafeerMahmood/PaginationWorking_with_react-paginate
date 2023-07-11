# Readme
this a Next.js project with typscript and tailwindcss that uses `react-paginate` 
to show a working example of pagination working feel free to clone and see the working.

# Getting Started
```bash
npm run dev
# or
yarn dev
```
to run
```sh
npm run dev
```

example code:

```js
 const [itemsPerPage, setItemsPerPage] = React.useState(5);
```

code that breaks the list into segments:
```js
  React.useEffect(() => {
    setCurrentItems(postList.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(postList.length / itemsPerPage))
  }, [endOffset, itemOffset, itemsPerPage, postList]);
```

for the return element:
```js
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
```
