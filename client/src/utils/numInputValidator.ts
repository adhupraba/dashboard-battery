export const numInputValidator = (e: React.KeyboardEvent<HTMLInputElement>) => {
  return ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
};
