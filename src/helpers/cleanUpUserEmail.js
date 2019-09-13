//

const cleanUpUserEmail = email => {
  const result = email.split('').filter(char => {
    return (
      char !== '.' &&
      char !== '$' &&
      char !== '[' &&
      char !== ']' &&
      char !== '#' &&
      char !== '/'
    );
  });
  return result.join('');
};

export default cleanUpUserEmail;
