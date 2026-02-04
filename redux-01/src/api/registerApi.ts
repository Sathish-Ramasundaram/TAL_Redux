export async function registerApi(email: string) {
  console.log("Register API:", email);

  await new Promise((r) => setTimeout(r, 1200));

  if (email.includes("@")) {
    return { ok: true };
  }

  throw new Error("Invalid email");
}
