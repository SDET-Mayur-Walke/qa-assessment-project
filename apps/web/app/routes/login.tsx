import { useState } from "react";
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { createGraphQLClient, LOGIN, CONFIRM_LOGIN } from "../lib/graphql-client";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const step = formData.get("step") as string;
  const email = formData.get("email") as string;
  
  const client = createGraphQLClient();

  try {
    if (step === "sendCode") {
      await client.request(LOGIN, { email });
      return json({ step: "confirmCode", email, success: true });
    }
    
    if (step === "confirmCode") {
      const code = formData.get("code") as string;
      const result = await client.request(CONFIRM_LOGIN, { email, code });
      
      // Set the JWT token as an HTTP-only cookie
      const headers = new Headers();
      headers.append("Set-Cookie", `auth-token=${result.confirmLogin}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`);
      
      return redirect("/orders", { headers });
    }
    
    return json({ error: "Invalid step" }, { status: 400 });
  } catch (error: any) {
    return json(
      { 
        error: error.message || "Login failed",
        step: formData.get("step"),
        email: formData.get("email")
      },
      { status: 400 }
    );
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [step, setStep] = useState<"email" | "code">(
    actionData?.step === "confirmCode" ? "code" : "email"
  );

  if (step === "code" || actionData?.step === "confirmCode") {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Enter Verification Code
        </h1>
        
        <p className="text-gray-600 mb-6 text-center">
          We've sent a 6-digit code to {actionData?.email || "your email"}
        </p>

        <Form method="post">
          <input type="hidden" name="step" value="confirmCode" />
          <input type="hidden" name="email" value={actionData?.email || ""} />
          
          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              maxLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
              placeholder="000000"
            />
          </div>

          {actionData?.error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{actionData.error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold"
          >
            Verify & Login
          </button>
        </Form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setStep("email")}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Use different email
          </button>
        </div>

        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-700">
            <strong>For testing:</strong> Check the API logs or use the test endpoint 
            <code className="bg-yellow-100 px-1 rounded">/__test__/mailbox?email={actionData?.email || "your-email"}</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Login to Your Account
      </h1>

      <Form method="post">
        <input type="hidden" name="step" value="sendCode" />
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            data-testid="login-email-input"
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {actionData?.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{actionData.error}</p>
          </div>
        )}

        <button
          data-testid="login-submit"
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold"
        >
          Send Verification Code
        </button>
      </Form>

      <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-xs text-gray-600">
          <strong>Demo users:</strong> Use <code className="bg-gray-100 px-1 rounded">demo@acme.test</code> or <code className="bg-gray-100 px-1 rounded">admin@acme.test</code>
        </p>
      </div>
    </div>
  );
}