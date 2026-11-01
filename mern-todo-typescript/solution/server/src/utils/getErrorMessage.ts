// A caught error is `unknown`, so narrow it before reading anything from it
export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message);
  }
  return "Something went wrong";
}
