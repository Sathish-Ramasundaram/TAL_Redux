
export async function sendChatApi(message: string) {
  const id = Math.floor(Math.random() * 10000);
  console.log("API send start:", id, message);

  await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));

  console.log("API send done:", id);

  return message;
}
