import React, { useEffect, useState } from "react";
import { Input, Avatar, Col, message, Spin } from "antd";
import {
  CommentOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import instance from "../api/cmsapi";

function Comment({ data, year, districtId, tableCommentedId, children, hideComment }) {
  const { user } = useAuth();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState({});
  const [showGapsInput, setShowGapsInput] = useState(false);
  const [gapsText, setGapsText] = useState("");
  const [editingGapsId, setEditingGapsId] = useState(null);
  const [editGapsText, setEditGapsText] = useState({});
  const [loading, setLoading] = useState(false);

  const currentUserRole = user?.user?.userRoles?.find(
    (role) => role.name === "DPAT TECHNICAL TEAM" || role.name === "DPAT QUALITY ASSURANCE"
  )?.name || "";
  const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";
  const isReviewer = currentUserRole === "DPAT QUALITY ASSURANCE";

  // Initialize comments from provided data
  useEffect(() => {
    if (data?.comments) {
      const filteredComments = data.comments.filter(
        (comment) => comment.tableCommented === tableCommentedId
      );
      setComments(filteredComments);
    }
  }, [data, year, tableCommentedId, districtId]);

  // Fetch comments from API
  useEffect(() => {
    const fetchComments = async () => {
      if (!districtId || !year) return;
      setLoading(true);
      try {
        const response = await instance.get(`comments/tables/${districtId}/${year}/DPAT`);
        const filteredComments = response.data.filter(
          (comment) =>
            comment.tableCommented === tableCommentedId &&
            comment.districtId === districtId &&
            (comment.userRole === "DPAT_TECHNICAL_TEAM" || comment.userRole === "DPAT_QUALITY_ASSURANCE")
        );
        setComments(filteredComments);
      } catch (error) {
        console.error("Failed to fetch comments:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        message.error("Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [districtId, year, tableCommentedId]);

  const handleCommentSubmit = async (submitText = commentText) => {
    if (!submitText.trim()) {
      message.error("Comment cannot be empty");
      return;
    }
    if (!currentUsername || !districtId || !year) {
      message.error("User or district information is missing");
      return;
    }

    const existingComment = comments.find(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.userRole === normalizedUserRole &&
        comment.districtId === districtId &&
        comment.username === currentUsername
    );

    const commentDate = new Date().toISOString().split("T")[0].split("-").map(Number);
    const payload = {
      id: existingComment ? existingComment.id : 0,
      username: currentUsername,
      fullName: currentFullName,
      userRole: normalizedUserRole,
      type: "DPAT",
      districtId: districtId,
      year: year,
      tableCommented: tableCommentedId,
      comments: submitText,
      gaps: existingComment ? existingComment.gaps || "" : "",
      commentDate: existingComment ? existingComment.commentDate : commentDate,
      updateDate: commentDate,
      dddpDataDate: commentDate,
      dddpData: {
        indicator: tableCommentedId,
        tables: data,
      },
    };

    try {
      if (existingComment && editingCommentId) {
        const response = await instance.put(`comments/${existingComment.id}`, payload);
        setComments(
          comments.map((comment) =>
            comment.id === existingComment.id
              ? { ...comment, comments: submitText, updateDate: commentDate }
              : comment
          )
        );
        message.success("Comment updated successfully");
        setEditingCommentId(null);
        setEditText({});
      } else if (existingComment) {
        const response = await instance.put(`comments/${existingComment.id}`, payload);
        setComments(
          comments.map((comment) =>
            comment.id === existingComment.id
              ? { ...comment, comments: submitText, updateDate: commentDate }
              : comment
          )
        );
        message.success("Comment updated successfully");
        setCommentText("");
        setShowCommentInput(false);
      } else {
        const response = await instance.post("comments", payload);
        setComments([...comments, response.data]);
        message.success("Comment added successfully");
        setCommentText("");
        setShowCommentInput(false);
      }
    } catch (error) {
      console.error("Failed to save comment:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      message.error(`Failed to save comment: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleGapsSubmit = async (submitGaps = gapsText) => {
    if (!submitGaps.trim()) {
      message.error("Gaps cannot be empty");
      return;
    }
    if (!currentUsername || !districtId || !year) {
      message.error("User or district information is missing");
      return;
    }

    const existingComment = comments.find(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.userRole === normalizedUserRole &&
        comment.districtId === districtId &&
        comment.username === currentUsername
    );

    const commentDate = new Date().toISOString().split("T")[0].split("-").map(Number);
    const payload = {
      id: existingComment ? existingComment.id : 0,
      username: currentUsername,
      fullName: currentFullName,
      userRole: normalizedUserRole,
      type: "DPAT",
      districtId: districtId,
      year: year,
      tableCommented: tableCommentedId,
      comments: existingComment ? existingComment.comments || "" : "",
      gaps: submitGaps,
      commentDate: existingComment ? existingComment.commentDate : commentDate,
      updateDate: commentDate,
      dddpDataDate: commentDate,
      dddpData: {
        indicator: tableCommentedId,
        tables: data,
      },
    };

    try {
      if (existingComment && editingGapsId) {
        const response = await instance.put(`comments/${existingComment.id}`, payload);
        setComments(
          comments.map((comment) =>
            comment.id === existingComment.id
              ? { ...comment, gaps: submitGaps, updateDate: commentDate }
              : comment
          )
        );
        message.success("Gaps updated successfully");
      } else if (existingComment) {
        const response = await instance.put(`comments/${existingComment.id}`, payload);
        setComments(
          comments.map((comment) =>
            comment.id === existingComment.id
              ? { ...comment, gaps: submitGaps, updateDate: commentDate }
              : comment
          )
        );
        message.success("Gaps updated successfully");
      } else {
        const response = await instance.post("comments", payload);
        setComments([...comments, response.data]);
        message.success("Gaps added successfully");
      }
      setGapsText("");
      setShowGapsInput(false);
      setEditingGapsId(null);
      setEditGapsText({});
    } catch (error) {
      console.error("Failed to save gaps:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      message.error(`Failed to save gaps: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEditComment = (comment) => {
    if (comment.username !== currentUsername) {
      message.error("You can only edit your own comments.");
      return;
    }
    setEditingCommentId(comment.id);
    setEditText({ ...editText, [comment.id]: comment.comments });
  };

  const handleEditGaps = (comment) => {
    if (comment.username !== currentUsername) {
      message.error("You can only edit your own gaps.");
      return;
    }
    setEditingGapsId(comment.id);
    setEditGapsText({ ...editGapsText, [comment.id]: comment.gaps });
  };

  const handleDeleteComment = async (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment.username !== currentUsername) {
      message.error("You can only delete your own comments.");
      return;
    }
    try {
      await instance.delete(`comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      setEditingCommentId(null);
      setEditingGapsId(null);
      setCommentText("");
      setGapsText("");
      setEditText({});
      setEditGapsText({});
      setShowCommentInput(false);
      setShowGapsInput(false);
      message.success("Comment deleted successfully");
    } catch (error) {
      console.error("Failed to delete comment:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      message.error("Failed to delete comment");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleEditKeyPress = (e, commentId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(editText[commentId]);
    }
  };

  const handleGapsKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGapsSubmit();
    }
  };

  const handleEditGapsKeyPress = (e, commentId) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGapsSubmit(editGapsText[commentId]);
    }
  };

  const canShowCommentInput = () => {
    if (isReviewer) {
      return false; // DPAT QUALITY ASSURANCE cannot comment
    }
    if (editingCommentId) {
      return false;
    }
    return true; // Allow multiple comments per user
  };

  const canAddGaps = () => {
    if (isReviewer) {
      return false;
    }
    return true; // Allow multiple gaps per user
  };

  const handleCommentButtonClick = () => {
    if (isReviewer) {
      message.info("DPAT QUALITY ASSURANCE cannot comment on indicators.");
      return;
    }
    if (canShowCommentInput()) {
      setShowCommentInput((prev) => !prev);
    } else {
      message.info("Cannot open comment input.");
    }
  };

  const handleGapsButtonClick = () => {
    if (isReviewer) {
      message.info("DPAT QUALITY ASSURANCE cannot enter gaps.");
      return;
    }
    if (canAddGaps()) {
      setShowGapsInput((prev) => !prev);
      setGapsText("");
    } else {
      message.info("Cannot open gaps input.");
    }
  };

  const renderCommentInput = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "800px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {!hideComment && !isReviewer && (
          <>
            <span>ADD COMMENT</span>
            <CommentOutlined
              style={{ cursor: "pointer", fontSize: "30px", flexShrink: 0 }}
              onClick={handleCommentButtonClick}
            />
          </>
        )}
      </div>

      {!hideComment && showCommentInput && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={
              user?.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"
            }
            style={{ marginRight: "10px", borderRadius: "50%", flexShrink: 0 }}
            size={32}
          />
          <Input.TextArea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a comment..."
            autoSize={{ minRows: 3, maxRows: 5 }}
            bordered={false}
            style={{
              flex: 1,
              borderRadius: "10px",
              padding: "8px 12px",
              background: "#f0f2f5",
              width: "700px",
            }}
          />
          {commentText.trim() && (
            <SendOutlined
              className="text-blue-500 cursor-pointer"
              style={{ fontSize: "20px", marginLeft: "8px", flexShrink: 0 }}
              onClick={() => handleCommentSubmit()}
            />
          )}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {!hideComment && !isReviewer && (
          <>
            <span style={{ marginLeft: "-10px" }}>ADD GAPS</span>
            <PlusCircleOutlined
              style={{ cursor: "pointer", fontSize: "25px", flexShrink: 0 }}
              onClick={handleGapsButtonClick}
            />
          </>
        )}
      </div>
      {!hideComment && showGapsInput && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={
              user?.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"
            }
            style={{ marginRight: "10px", borderRadius: "50%", flexShrink: 0 }}
            size={32}
          />
          <Input.TextArea
            value={gapsText}
            onChange={(e) => setGapsText(e.target.value)}
            onKeyPress={handleGapsKeyPress}
            placeholder="Add gaps..."
            autoSize={{ minRows: 3, maxRows: 5 }}
            bordered={false}
            style={{
              flex: 1,
              borderRadius: "10px",
              padding: "8px 12px",
              background: "#f0f2f5",
              width: "700px",
            }}
          />
          {gapsText.trim() && (
            <SendOutlined
              className="text-blue-500 cursor-pointer"
              style={{ fontSize: "20px", marginLeft: "8px", flexShrink: 0 }}
              onClick={() => handleGapsSubmit()}
            />
          )}
        </div>
      )}
    </div>
  );

  const renderCommentList = () => (
    <Spin spinning={loading} tip="Loading comments...">
      <div
        style={{
          borderTop: "1px solid #e8e8e8",
          padding: "8px",
          background: "#fff",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        {comments.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              paddingLeft: "12px",
              marginTop: showCommentInput && canShowCommentInput() ? "16px" : "0",
            }}
          >
            {comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  padding: "10px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "6px",
                  maxWidth: "700px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {/* Comment Section */}
                  {comment.comments && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Col>
                          <Avatar
                            src={
                              comment.userImage ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"
                            }
                            style={{ marginRight: "10px", borderRadius: "50%" }}
                            size={32}
                          />
                        </Col>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                            <h4 style={{ margin: 0, fontSize: "13px" }}>
                              {comment.fullName} (
                              {comment.userRole ? comment.userRole.replace("_", " ") : "Unknown Role"})
                            </h4>
                            {comment.username === currentUsername && (
                              <div style={{ marginLeft: "8px", display: "flex", gap: "8px" }}>
                                <span
                                  style={{
                                    marginLeft: "8px",
                                    display: "flex",
                                    marginRight: "8px",
                                  }}
                                >
                                  {comment.commentDate.join("/")}
                                </span>
                                <EditOutlined
                                  style={{ cursor: "pointer", color: "#000000ff" }}
                                  onClick={() => handleEditComment(comment)}
                                />
                                <DeleteOutlined
                                  style={{ cursor: "pointer", color: "#ff0000" }}
                                  onClick={() => handleDeleteComment(comment.id)}
                                />
                              </div>
                            )}
                          </div>
                          {editingCommentId === comment.id ? (
                            <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                              <Input.TextArea
                                value={editText[comment.id] || ""}
                                onChange={(e) =>
                                  setEditText({ ...editText, [comment.id]: e.target.value })
                                }
                                onKeyPress={(e) => handleEditKeyPress(e, comment.id)}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                style={{
                                  flex: 1,
                                  borderRadius: "10px",
                                  padding: "8px 12px",
                                  background: "#f0f2f5",
                                }}
                              />
                              {editText[comment.id]?.trim() && (
                                <SendOutlined
                                  className="text-blue-500 cursor-pointer"
                                  style={{ fontSize: "20px", marginLeft: "8px" }}
                                  onClick={() => handleCommentSubmit(editText[comment.id])}
                                />
                              )}
                            </div>
                          ) : (
                            <span style={{ fontSize: "16px" }}>{comment.comments}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Gaps Section */}
                  {comment.gaps && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Col>
                          <Avatar
                            src={
                              comment.userImage ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"
                            }
                            style={{ marginRight: "10px", borderRadius: "50%" }}
                            size={32}
                          />
                        </Col>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                            <h4 style={{ margin: 0, fontSize: "13px" }}>
                              {comment.fullName} (
                              {comment.userRole ? comment.userRole.replace("_", " ") : "Unknown Role"}
                              ) GAPS
                            </h4>
                            {comment.username === currentUsername && (
                              <div style={{ marginLeft: "8px", display: "flex", gap: "8px" }}>
                                <span
                                  style={{
                                    marginLeft: "8px",
                                    display: "flex",
                                    marginRight: "8px",
                                  }}
                                >
                                  {comment.updateDate.join("/")}
                                </span>
                                <EditOutlined
                                  style={{ cursor: "pointer", color: "#000000ff" }}
                                  onClick={() => handleEditGaps(comment)}
                                />
                                <DeleteOutlined
                                  style={{ cursor: "pointer", color: "#ff0000" }}
                                  onClick={() => handleDeleteComment(comment.id)}
                                />
                              </div>
                            )}
                          </div>
                          {editingGapsId === comment.id ? (
                            <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                              <Input.TextArea
                                value={editGapsText[comment.id] || ""}
                                onChange={(e) =>
                                  setEditGapsText({ ...editGapsText, [comment.id]: e.target.value })
                                }
                                onKeyPress={(e) => handleEditGapsKeyPress(e, comment.id)}
                                autoSize={{ minRows: 3, maxRows: 5 }}
                                style={{
                                  flex: 1,
                                  borderRadius: "10px",
                                  padding: "8px 12px",
                                  background: "#f0f2f5",
                                }}
                              />
                              {editGapsText[comment.id]?.trim() && (
                                <SendOutlined
                                  className="text-blue-500 cursor-pointer"
                                  style={{ fontSize: "20px", marginLeft: "8px" }}
                                  onClick={() => handleGapsSubmit(editGapsText[comment.id])}
                                />
                              )}
                            </div>
                          ) : (
                            <span style={{ fontSize: "16px" }}>{comment.gaps}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Spin>
  );

  return children({ renderCommentInput, renderCommentList });
}

export default Comment;