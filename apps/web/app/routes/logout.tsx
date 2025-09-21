import { redirect, type ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  // Clear the authentication cookie
  const headers = new Headers();
  headers.append("Set-Cookie", "auth-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax");
  
  return redirect("/", { headers });
}

export async function loader() {
  return redirect("/");
}