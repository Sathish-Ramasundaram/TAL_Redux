
export async function fetchDemoStatus() {
  console.log("API called...");

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return { ok: true };
}
