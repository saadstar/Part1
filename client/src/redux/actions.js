export const addReply = (contatct) => {
  return {
    type: "ADD_REPLY",
    payload: contatct,
  };
};
export const editReply = (contatct) => {
  return {
    type: "EDIT_REPLY",
    payload: contatct,
  };
};
export const deleteReply = (contatct) => {
  return {
    type: "DELETE_REPLY",
    payload: contatct,
  };
};
