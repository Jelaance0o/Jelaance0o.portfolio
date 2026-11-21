const KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
// Submits the contact form straight to Web3Forms (no custom backend). The access key is a public form identifier
// restricted by the domain/email you configure in the Web3Forms dashboard.
export async function sendMessage({ name, email, message, botcheck }) {
  if (!KEY) throw Object.assign(new Error("Missing VITE_WEB3FORMS_ACCESS_KEY"), { code: "NO_KEY" });
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: KEY, subject: `Portfolio message from ${name}`, from_name: "Portfolio contact form", name, email, message, botcheck }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || "Send failed");
  return data;
}
