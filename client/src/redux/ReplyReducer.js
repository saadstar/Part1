import React from "react";
const initialState = [
  {
    id: 3,
    content:
      "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    createdAt: "1 week ago",
    score: 4,
    replyingTo: "maxblagun",         
        image: "./images/avatars/image-ramsesmiron.png",
      username: "ramsesmiron",   
  },
  {
    id: 4,
    content:
      "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
    createdAt: "2 days ago",
    score: 2,
    replyingTo: "ramsesmiron",  
        image: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",      
      username: "juliusomo",   
  },
];

export const ReplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REPLY":
      return [...state, action.payload];
    case "EDIT_REPLY":
      const upadteState = state.map((reply) =>
        reply.id === reply.payload.id ? action.payload : reply
      );
      state = upadteState;
      return state;
    case "DELETE_REPLY":
      const filterContacts = state.filter(
        (reply) => reply.id !== action.payload 
      );
      state = filterContacts;
      return state;
    default:
      return state;
  }
};
