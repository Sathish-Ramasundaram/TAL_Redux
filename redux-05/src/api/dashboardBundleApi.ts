
export async function fetchProfileApi() {
  console.log("profile start");
  await new Promise((r) => setTimeout(r, 1200));

  console.log("profile done");
  return {
    name: "Sathish",
    role: "Admin",
    lastLogin: "Today",
  };
}

export async function fetchNotificationsApi() {
  console.log("notifications start");
  await new Promise((r) => setTimeout(r, 800));

  console.log("notifications done");
  return [
    "New message received",
    "Report generated",
  ];
}

export async function fetchStatsApi() {
  console.log("stats start");
  await new Promise((r) => setTimeout(r, 1500));

  console.log("stats done");
  return {
    orders: 24,
    users: 310,
    tasks: 18,
  };
}
