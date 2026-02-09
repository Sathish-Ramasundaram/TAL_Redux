export async function loginApi(email: string, password: string) {
  console.log("Login API called with:", email);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (email === "demo@demo.com" && password === "1234") {
    return { success: true };
  }

  throw new Error("Invalid credentials");
}
