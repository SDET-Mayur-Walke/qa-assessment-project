import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useFetcher, Form } from "@remix-run/react";
import { formatMoney } from "shared";
import { 
  createGraphQLClient, 
  GET_CART, 
  UPDATE_CART_ITEM, 
  REMOVE_FROM_CART, 
  APPLY_COUPON 
} from "../lib/graphql-client";
import { getSessionId } from "../lib/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const sessionId = getSessionId(request);
  const client = createGraphQLClient(undefined, undefined, sessionId);
  
  try {
    const result = await client.request(GET_CART);
    return json({ cart: result.cart, sessionId });
  } catch (error) {
    console.error("Failed to load cart:", error);
    return json({ 
      cart: { items: [], subtotal: 0, discountTotal: 0, total: 0, version: 1 },
      sessionId 
    });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("_action") as string;
  const sessionId = getSessionId(request);
  
  const client = createGraphQLClient(undefined, undefined, sessionId);

  try {
    switch (actionType) {
      case "updateQuantity": {
        const productId = formData.get("productId") as string;
        const quantity = parseInt(formData.get("quantity") as string);
        
        const result = await client.request(UPDATE_CART_ITEM, {
          productId,
          quantity
        });
        
        return json({ success: true, cart: result.updateCartItem });
      }
      
      case "removeItem": {
        const productId = formData.get("productId") as string;
        
        const result = await client.request(REMOVE_FROM_CART, {
          productId
        });
        
        return json({ success: true, cart: result.removeFromCart });
      }
      
      case "applyCoupon": {
        const code = formData.get("code") as string;
        
        const result = await client.request(APPLY_COUPON, {
          code
        });
        
        return json({ success: true, cart: result.applyCoupon });
      }
      
      default:
        return json({ success: false, error: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    return json(
      { 
        success: false, 
        error: error.message || "Action failed" 
      },
      { status: 400 }
    );
  }
}

export default function Cart() {
  const { cart, sessionId } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  if (cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Your cart is empty
          </p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Hidden cart version for testing */}
          <div data-testid="cart-version" style={{ display: "none" }}>
            {cart.version}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg">
            {cart.items.map((item: any, index: number) => (
              <div
                key={item.product.id}
                className={`p-6 ${
                  index < cart.items.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {item.product.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                    ) : (
                      <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400">📦</span>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600">
                        {formatMoney(item.product.price)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <fetcher.Form method="post">
                      <input type="hidden" name="_action" value="updateQuantity" />
                      <input type="hidden" name="productId" value={item.product.id} />
                      <select
                        name="quantity"
                        defaultValue={item.quantity}
                        onChange={(e) => {
                          const form = e.target.closest("form") as HTMLFormElement;
                          fetcher.submit(form);
                        }}
                        className="border border-gray-300 rounded px-2 py-1"
                      >
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>
                            {num === 0 ? "Remove" : num}
                          </option>
                        ))}
                      </select>
                    </fetcher.Form>

                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {formatMoney(item.lineTotal)}
                      </p>
                    </div>

                    <fetcher.Form method="post">
                      <input type="hidden" name="_action" value="removeItem" />
                      <input type="hidden" name="productId" value={item.product.id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </fetcher.Form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatMoney(cart.subtotal)}</span>
              </div>
              
              {cart.discountTotal > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>
                    Discount {cart.appliedCoupon && `(${cart.appliedCoupon})`}
                  </span>
                  <span>-{formatMoney(cart.discountTotal)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatMoney(cart.total)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Apply Coupon
              </h3>
              <fetcher.Form method="post" className="flex">
                <input type="hidden" name="_action" value="applyCoupon" />
                <input
                  data-testid="cart-apply-coupon"
                  type="text"
                  name="code"
                  placeholder="Enter coupon code"
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-700"
                >
                  Apply
                </button>
              </fetcher.Form>
              {fetcher.data?.error && (
                <p className="text-sm text-red-600 mt-2">
                  {fetcher.data.error}
                </p>
              )}
            </div>

            <Form action="/checkout" method="post">
              <button
                data-testid="checkout-submit"
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}