//

const httpValidate = source => {
  return !!source.match(
    /http(s?):\/\/(www\.)?([A-Z]|[a-z]|[0-9]|[-])+(\.)([A-Z]|[a-z]|[0-9]|[-])*(\.)?(com|edu|biz|org|co)/gi,
  );
};

export default httpValidate;
