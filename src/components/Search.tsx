"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  SearchBox,
  Hits,
  Highlight,
  useSearchBox,
  useHits,
} from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!
);

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;

type SearchProps = {
  show: boolean;
  onClose: () => void;
};

function CustomResults({ onCloseAndReset }: { onCloseAndReset: () => void }) {
  const { hits } = useHits();

  if (!hits.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        <p>No blog posts found. Try another search.</p>
      </div>
    );
  }

  return (
    <div>
      <Hits
        hitComponent={({ hit }) => (
          <Link
            href={`/blog/${hit.slug}`}
            onClick={onCloseAndReset}
            className="flex items-center gap-4 mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            {hit.coverImage?.url ? (
              <Image
                src={hit.coverImage.url}
                alt={hit.title}
                width={80}
                height={80}
                className="object-cover rounded-md w-20 h-20 flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-xs text-gray-400 dark:text-gray-500">
                No Image
              </div>
            )}

            <div className="flex flex-col flex-grow">
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                <Highlight attribute="title" hit={hit} />
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <Highlight attribute="category" hit={hit} />
              </p>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {hit.author}
              </span>
            </div>
          </Link>
        )}
      />
    </div>
  );
}

function SearchContent({
  query,
  setQuery,
  onClose,
}: {
  query: string;
  setQuery: (q: string) => void;
  onClose: () => void;
}) {
  const { refine } = useSearchBox();

  const handleCloseAndReset = () => {
    refine("");
    setQuery("");
    onClose();
  };

  return (
    <>
      <SearchBox
        placeholder="Search blog posts..."
        classNames={{
          root: "mb-4",
          input:
            "border p-2 rounded border-gray-300 dark:border-gray-600 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500",
          submit: "hidden",
          reset: "hidden",
        }}
      />

      {query && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Results for:{" "}
            <span className="text-brand-700 dark:text-brand-400">{query}</span>
          </h2>
          <CustomResults onCloseAndReset={handleCloseAndReset} />
        </div>
      )}
    </>
  );
}

export function Search({ show, onClose }: SearchProps) {
  const [query, setQuery] = useState("");

  if (!show) return null;

  return (
    <div className="absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-md z-40 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom py-4 px-4 sm:px-6 lg:px-8">
        <InstantSearchNext
          indexName={indexName}
          searchClient={searchClient}
          initialUiState={{ [indexName]: { query: "" } }}
          onStateChange={({ uiState }) => {
            setQuery(uiState[indexName]?.query || "");
          }}
        >
          <SearchContent query={query} setQuery={setQuery} onClose={onClose} />
        </InstantSearchNext>
      </div>
    </div>
  );
}
