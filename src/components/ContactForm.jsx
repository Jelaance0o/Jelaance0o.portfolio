import { useState } from "react";
import MagneticButton from "./MagneticButton";
import { sendMessage } from "../services/web3forms";
import { socials } from "../data/socials";
const TYPES = ["Landing page","Business website","React app","Full-stack / SaaS","Something else"];
const BUDGETS = ["","Not sure yet","Under ₹10,000","₹10,000 – ₹25,000","₹25,000 – ₹50,000","₹50,000+"];
const mail = socials.email.replace("mailto:", "");
const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Tell me your name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email.";
  if (v.message.trim().length < 10) e.message = "A little more detail, please.";
  return e;
};
function Field({ k, label, err, children }) {
  return (<div className={`field ${err ? "has-err" : ""}`}>
    <label htmlFor={k}>{label}</label>{children}
    {err && <span id={`${k}-e`} role="alert" className="field__err">{err}</span>}
  </div>);
}
export default function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", projectType: TYPES[0], budget: "", message: "" });
  const [hp, setHp] = useState(false); // honeypot (Web3Forms "botcheck")
  const [err, setErr] = useState({});
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [note, setNote] = useState("");
  const aria = (k) => ({ id: k, name: k, value: v[k], onChange: (e) => setV({ ...v, [k]: e.target.value }), "aria-invalid": !!err[k], "aria-describedby": err[k] ? `${k}-e` : undefined, disabled: state === "loading" });
  const submit = async (e) => {
    e.preventDefault();
    const er = validate(v); setErr(er);
    if (Object.keys(er).length) return;
    setState("loading");
    try { await sendMessage({ ...v, botcheck: hp }); setState("success"); }
    catch (x) { setNote(x.code === "NO_KEY" ? "Form isn't configured yet (missing Web3Forms key)." : "Your message didn't go through."); setState("error"); }
  };
  if (state === "success") return (<div className="sent" role="status"><h3>MESSAGE SENT ✓</h3><p>I'LL GET BACK TO YOU.</p><i className="sent__dot" /></div>);
  return (
    <form onSubmit={submit} noValidate className="form">
      <Field k="name" label="Name" err={err.name}><input autoComplete="name" {...aria("name")} /></Field>
      <Field k="email" label="Email" err={err.email}><input type="email" autoComplete="email" {...aria("email")} /></Field>
      <Field k="projectType" label="Project type"><select {...aria("projectType")}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
      <Field k="budget" label="Budget (optional)"><select {...aria("budget")}>{BUDGETS.map((t) => <option key={t} value={t}>{t || "Prefer not to say"}</option>)}</select></Field>
      <Field k="message" label="Message" err={err.message}><textarea rows="4" {...aria("message")} /></Field>
      <input type="checkbox" className="sr-only" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" checked={hp} onChange={(e) => setHp(e.target.checked)} />
      {state === "error" && <div role="alert" className="form__fail"><b>COULDN'T SEND</b><p>{note} Email me at <a className="ulink" href={socials.email}>{mail}</a>.</p></div>}
      <MagneticButton type="submit" label="GO" disabled={state === "loading"}>{state === "loading" ? "SENDING..." : state === "error" ? "TRY AGAIN →" : "START A CONVERSATION →"}</MagneticButton>
      {state !== "error" && <p className="label">Or email directly: <a className="ulink" href={socials.email}>{mail}</a></p>}
    </form>
  );
}
