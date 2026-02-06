
export async function availableApi() {
  console.log("API: Items widely available");
  await new Promise((r) => setTimeout(r, 700));
  return "Available";
}

export async function demandApi() {
  console.log("API: Few items — high demand");
  await new Promise((r) => setTimeout(r, 700));
  return "Few items — High demand";
}
