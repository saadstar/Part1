import React, { useEffect, useState } from 'react';
import { Reply } from "./Reply";
import {  useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addReply } from "../redux/actions";


export const Comment = () => {
  const [content, setContent] = useState("");
  const [editValue, setEditValue] = useState("");
  const [selectedcomment, setSelectedcomment] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [comments, setComments] = useState([]);
  const reply = useSelector((state) => state);
  const dispatch = useDispatch();
  const [contenttwo, setContenttwo] = useState("");
  const [image, setImage] = useState("./images/avatars/image-juliusomo.png");
  const [createdAt, setCreatedAt] = useState("1 min ago");
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState("juliusomo");
  const [mention, setMention] = useState("maxblagun");
  const createReply = (e) => {
    e.preventDefault();
    if (content === "") {
      console.log("content is required");
    }
    const data = {
      id: reply[reply.length - 1].id + 1,
      content:contenttwo,
      image,
      createdAt,
      replyingTo:mention,
      score,
      username,
    };
    dispatch(addReply(data));
  };
  
  const getAllComments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3600/api/comment"
      );
      setComments(res.data);
    } catch (err) {
      console.log(err)
    }
  }
  const createComment = async () => {
    await axios.post("http://localhost:3600/api/comment", { content });
    getAllComments();
    setContent("");
  }
  const updateComment = async () => {
    await axios.put(`http://localhost:3600/api/comment/${selectedcomment}`, {
      content: editValue
    });
    getAllComments();
    setEditValue("");
  }
  const deleteComment = async () => {
     await axios.delete(`http://localhost:3600/api/comment/${selectedId}`);   
    getAllComments();
  }
 
  // const addReply = async () => {
  //   await axios.post(`http://localhost:3600/api/reply/${selectedCommentId}`, { content: replyContent });
  //   getAllComments();

  //   setReplyContent("")
  //   setSelectedCommentId(null)
  // }  
  useEffect(() => {
    getAllComments();
  }, []);



  const [editFormVisability, setEditFormVisability] = useState(false);
  const handleEditClick = () => {
    setEditFormVisability(true);
  }
    return (
      <div className="container mb">
        {comments.map((item, i) => {
                   
          return (
            <div className="container mt-4 revo" key={item._id}>
              <div className="d-flex direction-column whiter p-4">
                <div className="butnContainer p-1 ">
                  <button>+</button>
                  <p className="mb-0">{item.score}</p>
                  <button>-</button>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex imger ms-2">
                    <div className="d-flex">
                      <img src={item.image} alt="comment" />
                      <p className="username">{item.username}</p>
                      {item.username === "juliusomo" && (
                        <span className="you">you</span>
                      )}
                      <p className="date">{item.createdAt}</p>
                    </div>
                  </div>
                  <p className="text-content"> {item.content}</p>
                </div>
                {item.username !== "juliusomo" ? (
                  // <!-- Button trigger modal -->
                  <>
                    <div className="replyr abso">
                      <button
                        className="editer"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal5"
                      >
                        <i class="fa-solid fa-share fa-flip-horizontal"></i>
                        reply
                      </button>
                    </div>
                    {/* // <!-- Modal --> */}
                    <div
                      class="modal fade"
                      id="exampleModal5"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Reply
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <form className="form-group">
                              <div className="d-flex justify-content-between mt-2  direction-column whiter p-4">
                                <img
                                  src="./images/avatars/image-juliusomo.png"
                                  alt="me"
                                  width={50}
                                  height={50}
                                />
                                <input
                                  required
                                  onChange={(e) =>
                                    setContenttwo(e.target.value)
                                  }
                                  value={contenttwo}
                                  type="text"
                                  placeholder="Add Your Reply Comment"
                                  className="input form-control"
                                />
                              </div>
                            </form>{" "}
                          </div>
                          <div class="modal-footer">
                            <button
                              className="btn"
                              data-bs-dismiss="modal"
                              onClick={createReply}
                            >
                              SEND
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="replyr abso d-flex  gap-4">
                    {/* <!-- Button trigger modal --> */}
                    <button
                      type="button"
                      class=" danger d-flex gap-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      onClick={() => setSelectedId(item._id)}
                    >
                      <i class="fa-solid fa-trash"></i> DELETE
                    </button>
                    {/* <!-- Modal --> */}
                    <div
                      class="modal fade"
                      id="exampleModal2"
                      tabindex="-1"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered w-50">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1
                              class="modal-title fs-5 fw-bold text-center"
                              id="exampleModalLabel"
                            >
                              Delete Comment
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <p className="text-center gray fs-5 p-2">
                            Are You sure you want to delete this commnet? This
                            will remove the comment and undone.
                          </p>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary bg-gray cancel"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              No,Cancel
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary-danger dangerious"
                              data-bs-dismiss="modal"
                              onClick={deleteComment}
                            >
                              Yes,Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Button trigger modal --> Edit Section */}
                    <button
                      type="button"
                      class="editer  ms-1"
                      data-bs-toggle="modal"
                      onClick={() => {
                        setSelectedcomment(item._id);
                        setEditValue("");
                      }}
                      data-bs-target="#exampleModal"
                    >
                      <i class="fa-solid fa-pen"></i>
                      Edit
                    </button>
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered ">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1
                              class="modal-title fs-5"
                              id="exampleModalLabel"
                            >{`Edit Your Comment`}</h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body d-flex">
                            <img
                              alt="editPic"
                              src={item.image}
                              height={50}
                              width={50}
                              className="img "
                            />
                            <input
                              className="form-control border-dark ms-2 black"
                              value={editValue}
                              placeholder={item.content}
                              onChange={(e) => setEditValue(e.target.value)}
                            />
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={updateComment}
                            >
                              UPDATE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {reply.length >= 0 && (
                <Reply
                  reply={reply}
                  editFormVisability={editFormVisability}
                />
              )}
            </div>
          );
  })}
         {/* add comment create  */}
         <div className="container mb-4"> 
          <form onSubmit={(e) => e.preventDefault()} className="form-group"> 
         <div className="d-flex justify-content-between mt-2  direction-column whiter p-4">
             <img
               src="./images/avatars/image-juliusomo.png"
                alt="me"
               width={50} 
                height={50} 
               /> 
             <input 
             required
                onChange={(e) => setContent(e.target.value)}
                 value={content}
               type="text"
                placeholder="Add Your Comment"
                 className="input form-control"
               />
               <button className="btn" onClick={createComment}>
                 SEND
               </button>
             </div> 
           </form> 
        </div>
        </div>
          
    );
    
}
