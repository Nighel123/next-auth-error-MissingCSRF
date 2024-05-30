import { signIn } from "@/auth";

export default function Login({
  searchParams,
}: {
  searchParams?: {
    callbackUrl?: string;
  };
}) {
  const callbackUrl = searchParams?.callbackUrl || "/";

  return (
    <>
      <form
        action={async (formData) => {
          "use server";
          const lol = await signIn("credentials", {
            username: "lol",
            password: "123456",
            redirectTo: callbackUrl,
          });
          console.log(lol);
        }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
        <br />
        {callbackUrl}
      </form>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <div
        id="g_id_onload"
        data-client_id="YOUR_GOOGLE_CLIENT_ID"
        data-login_uri="https://your.domain/your_login_endpoint"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </>
  );
}
