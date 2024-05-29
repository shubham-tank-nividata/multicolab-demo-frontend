export const generateRandomString = () => {
  const str = 'x'
    .repeat(10)
    .replace(
      /./g,
      (_) =>
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[
          Math.floor(Math.random() * 62)
        ]
    );

  return str;
};
