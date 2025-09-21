import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher, useRouteError } from "@remix-run/react";
import { formatMoney } from "shared";
import { createGraphQLClient, GET_PRODUCT, ADD_TO_CART } from "../lib/graphql-client";
import { getSessionId } from "../lib/session";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) {
    throw new Response("Product not found", { status: 404 });
  }

  const client = createGraphQLClient();
  
  try {
    const result = await client.request(GET_PRODUCT, { slug });
    
    if (!result.product) {
      throw new Response("Product not found", { status: 404 });
    }

    return json({ product: result.product });
  } catch (error) {
    console.error("Failed to load product:", error);
    throw new Response("Failed to load product", { status: 500 });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const productId = formData.get("productId") as string;
  const quantity = parseInt(formData.get("quantity") as string) || 1;
  
  const sessionId = getSessionId(request);
  const client = createGraphQLClient(undefined, undefined, sessionId);

  try {
    const result = await client.request(ADD_TO_CART, {
      input: { productId, quantity }
    });

    return json({ success: true, cart: result.addToCart });
  } catch (error: any) {
    return json(
      { 
        success: false, 
        error: error.message || "Failed to add to cart" 
      },
      { status: 400 }
    );
  }
}

export function ErrorBoundary() {
  const error = useRouteError();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Products
        </a>
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { product } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  const isAddingToCart = fetcher.state === "submitting";
  const addToCartError = fetcher.data?.error;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-6xl">📦</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-semibold text-gray-900">
              {formatMoney(product.price)}
            </span>
            
            {!product.inStock && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {product.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              ))}
            </div>
          </div>

          <fetcher.Form method="post">
            <input type="hidden" name="productId" value={product.id} />
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <select
                id="quantity"
                name="quantity"
                className="border border-gray-300 rounded-md px-3 py-1"
                defaultValue="1"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {!product.inStock && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Out of Stock
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      This product is currently unavailable.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {addToCartError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <p className="text-sm text-red-700">{addToCartError}</p>
              </div>
            )}

            <button
              data-testid="add-to-cart"
              type="submit"
              disabled={!product.inStock || isAddingToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isAddingToCart 
                ? "Adding to Cart..." 
                : !product.inStock 
                  ? "Out of Stock" 
                  : "Add to Cart"
              }
            </button>
          </fetcher.Form>

          {fetcher.data?.success && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-sm text-green-700">
                ✅ Added to cart successfully!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}