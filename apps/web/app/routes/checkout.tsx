import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { createGraphQLClient, CHECKOUT } from "../lib/graphql-client";
import { getSessionId } from "../lib/session";

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

  return json({ authenticated: true });
}

export async function action({ request }: ActionFunctionArgs) {
  // Read auth token from cookies
  const cookieHeader = request.headers.get("Cookie");
  const token = cookieHeader
    ?.split(";")
    .find(cookie => cookie.trim().startsWith("auth-token="))
    ?.split("=")[1] || "";
  
  if (!token) {
    return redirect("/login");
  }

  const sessionId = getSessionId(request);
  const client = createGraphQLClient(token, undefined, sessionId);

  try {
    const result = await client.request(CHECKOUT);
    return redirect("/orders");
  } catch (error: any) {
    return json(
      { 
        error: error.message || "Checkout failed" 
      },
      { status: 400 }
    );
  }
}

export default function Checkout() {
  const actionData = useActionData<typeof action>();
  const { authenticated } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Complete Your Order
      </h1>
      
      <div className="mb-6">
        <p className="text-gray-600 text-center mb-4">
          Ready to place your order? Click the button below to complete your purchase.
        </p>
      </div>

      {actionData?.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{actionData.error}</p>
        </div>
      )}

      <form method="post">
        <button
          data-testid="complete-order"
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-700 transition-colors"
        >
          Complete Order
        </button>
      </form>

      <div className="mt-4 text-center">
        <a
          href="/cart"
          className="text-blue-600 hover:text-blue-700 text-sm"
        >
          ← Back to Cart
        </a>
      </div>
    </div>
  );
}