import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { formatMoney } from "shared";
import { createGraphQLClient, GET_ORDERS } from "../lib/graphql-client";

export async function loader({ request }: LoaderFunctionArgs) {
  // Read auth token from cookies
  const cookieHeader = request.headers.get("Cookie");
  const token = cookieHeader
    ?.split(";")
    .find(cookie => cookie.trim().startsWith("auth-token="))
    ?.split("=")[1] || "";
  
  if (!token) {
    return redirect("/login");
  }

  const client = createGraphQLClient(token);
  
  try {
    const result = await client.request(GET_ORDERS);
    return json({ orders: result.orders });
  } catch (error: any) {
    if (error.message?.includes("UNAUTHENTICATED")) {
      return redirect("/login");
    }
    return json({ orders: [] });
  }
}

export default function Orders() {
  const { orders } = useLoaderData<typeof loader>();

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Orders
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            You haven't placed any orders yet
          </p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order: any) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Order #{order.number}
                </h2>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {formatMoney(order.total)}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Items Ordered
              </h3>
              <div className="space-y-2">
                {order.items.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-900">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-gray-600">
                      {formatMoney(item.lineTotal)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}