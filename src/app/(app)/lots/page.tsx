import { redirect } from "next/navigation";

/** Lots list lives on the Find map — keep this route as a redirect. */
export default function LotsPage() {
  redirect("/home");
}
