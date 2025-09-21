import React, { useState } from "react";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { ProductCard } from "../components/ProductCard";
import { createGraphQLClient, GET_PRODUCTS } from "../lib/graphql-client";
import { useDebounce } from "../hooks/useDebounce";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const tag = url.searchParams.get("tag") || "";
  const after = url.searchParams.get("after") || "";

  const client = createGraphQLClient();
  
  try {
    const result = await client.request(GET_PRODUCTS, {
      query: query || undefined,
      tag: tag || undefined,
      after: after || undefined,
      first: 12
    });

    return json({
      products: result.products,
      query,
      tag
    });
  } catch (error) {
    console.error("Failed to load products:", error);
    return json({
      products: { edges: [], pageInfo: { hasNextPage: false }, totalCount: 0 },
      query,
      tag
    });
  }
}

export default function Index() {
  const { products, query: initialQuery, tag: initialTag } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTag, setSelectedTag] = useState(initialTag);

  // INTENTIONAL BUG: Search debounce race condition
  // The debounced value triggers navigation but doesn't cancel previous requests
  const debouncedQuery = useDebounce(searchQuery, 400);

  // Navigate when debounced query changes
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("query", debouncedQuery);
    if (selectedTag) params.set("tag", selectedTag);
    
    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    navigate(newUrl, { replace: true });
  }, [debouncedQuery, selectedTag, navigate]);

  const allTags = Array.from(
    new Set(
      products.edges
        .flatMap((edge: any) => edge.node?.tags || [])
        .filter(Boolean)
    )
  ).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Our Products
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              data-testid="search-input"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(searchQuery || selectedTag) && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              {products.totalCount} product{products.totalCount !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedTag && ` in category "${selectedTag}"`}
            </p>
          </div>
        )}
      </div>

      {products.edges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.edges.map((edge: any) => (
            <ProductCard key={edge.node?.id || edge.cursor} product={edge.node} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
          {(searchQuery || selectedTag) && (
            <p className="text-gray-400 mt-2">
              Try adjusting your search or filter
            </p>
          )}
        </div>
      )}

      {products.pageInfo.hasNextPage && (
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("after", products.pageInfo.endCursor);
              navigate(`/?${params.toString()}`);
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}