import React from "react";

const totalPageCalculate = (total, limit) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pages.push(i);
  }
  return pages;
};

const Paginate = ({ activePage, SetActivePage, pageCount, PerPage }) => {
  const pages = totalPageCalculate(pageCount, PerPage);
  const displayPages = [];

  if (pages.length <= 7) {
    displayPages.push(...pages);
  } else if (activePage <= 4) {
    displayPages.push(...pages.slice(0, 5), "...", pages[pages.length - 1]);
  } else if (activePage >= pages.length - 3) {
    displayPages.push(
      1,
      "...",
      pages[pages.length - 5],
      pages[pages.length - 4],
      pages[pages.length - 3],
      pages[pages.length - 2],
      pages[pages.length - 1]
    );
  } else {
    displayPages.push(
      1,
      "...",
      pages[activePage - 2],
      pages[activePage - 1],
      pages[activePage],
      pages[activePage + 1],
      pages[activePage + 2],
      "...",
      pages[pages.length - 1]
    );
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        {activePage !== 1 ? (
          <li onClick={() => SetActivePage(activePage - 1)}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden={true}
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        ) : null}

        {displayPages.map((pageno, idx) => {
          return (
            <li
              key={idx}
              onClick={() =>
                typeof pageno === "number" && SetActivePage(pageno)
              }
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                }}
                className={`${pageno === activePage
                  ? `btn bg-gray-200 text-white`
                  : `bg-white`
                  } px-3 py-2 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {pageno}
              </a>
            </li>
          );
        })}
        {activePage !== Math.ceil(pageCount / PerPage) ? (
          <li onClick={() => SetActivePage(activePage + 1)}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}

              disabled={true}
              className="disabled block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                aria-hidden={true}
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Paginate;
