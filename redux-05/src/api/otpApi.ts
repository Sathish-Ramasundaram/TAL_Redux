
export async function verifyOtpApi(otp: string) {
  if (otp === "1234") {
    console.log("OTP path");
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true };
  }


  throw new Error("Invalid OTP");
}
