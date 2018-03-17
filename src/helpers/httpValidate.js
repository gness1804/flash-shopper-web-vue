// @flow

const httpValidate = (source: string): boolean => {
  if (source.match(/http(s?):\/\/(www\.)?([A-Z]|[a-z]|[0-9]|[-])+(\.)(com|edu|biz|org|co)/gi)) {
    return true;
  }
  return false;
};

export default httpValidate;
