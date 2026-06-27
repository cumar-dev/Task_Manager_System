export const extractErrorMessages = (error) => {
  if (!error) return null;
  if (error.response?.data) {
    const data = error.response.data;
  }

  // handle zod validation errors (array format)
  if (data?.errors && Array.isArray(data.errors)) {
    return data.errors.map((err) => err.message).join(",");
  }

  // handle single error message

  if (data.message) {
    return data.message;
  }

  // handle error fields

  if (data.error) {
    return data.error;
  }

  //   handle network errors
  if (error.response || !error.response) {
    return "Network Error, please check your connection";
  }

  // fall back to general error

  if(error.message) {
    return error.message;
  }

//   handle other types of error
  return "Something went wrong please try again...";
};
