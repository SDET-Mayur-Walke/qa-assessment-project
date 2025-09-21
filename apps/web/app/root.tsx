import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Header } from "./components/Header";
import { createGraphQLClient, GET_ME, GET_CART } from "./lib/graphql-client";
import { getSessionId, setSessionIdCookie } from "./lib/session";

import tailwindStyles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  // Read auth token from cookies
  const cookieHeader = request.headers.get("Cookie");
  const token = cookieHeader
    ?.split(";")
    .find(cookie => cookie.trim().startsWith("auth-token="))
    ?.split("=")[1] || "";
    
  // Get or generate session ID
  const sessionId = getSessionId(request);
  
  const client = createGraphQLClient(token, undefined, sessionId);
  
  try {
    const [userResult, cartResult] = await Promise.allSettled([
      client.request(GET_ME),
      client.request(GET_CART)
    ]);

    const user = userResult.status === "fulfilled" ? userResult.value.me : null;
    const cart = cartResult.status === "fulfilled" ? cartResult.value.cart : { items: [] };
    const cartCount = cart.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;

    // Set session cookie if it's a new session
    const hasSessionCookie = cookieHeader?.includes("session-id=");
    const headers = hasSessionCookie ? undefined : new Headers([
      ["Set-Cookie", setSessionIdCookie(sessionId)]
    ]);

    return json({ user, cartCount, sessionId }, headers ? { headers } : {});
  } catch (error) {
    // Set session cookie even for errors if it's a new session
    const hasSessionCookie = cookieHeader?.includes("session-id=");
    const headers = hasSessionCookie ? undefined : new Headers([
      ["Set-Cookie", setSessionIdCookie(sessionId)]
    ]);
    
    return json({ user: null, cartCount: 0, sessionId }, headers ? { headers } : {});
  }
}

export default function App() {
  const { user, cartCount } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header user={user} cartCount={cartCount} />
        <main>
          <Outlet />
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}