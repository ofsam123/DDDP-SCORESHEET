import React, { useEffect, useState } from "react";
import { Input, Avatar, Col, message, Row } from "antd";
import { CommentOutlined, SendOutlined, EditOutlined, DeleteOutlined, DislikeOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import axios from "axios";

function Comment({ data, year, districtId, tableCommentedId, children }) {
  const { user } = useAuth();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState({});

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
      try {
        const response = await axios.get(`https://dddpadminportal.aoinnovations.org/liza/api/v1/comments/tables/${districtId}/${year}/DPAT`, {
          params: { districtId, year, tableCommentedId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("dddp_token") || ""}`,
          },
        });
        const filteredComments = response.data.filter(
          (comment) => comment.tableCommented === tableCommentedId && comment.districtId === districtId && comment.userRole === "DPAT_TECHNICAL TEAM"
        );
        setComments(filteredComments);
      } catch (error) {
        console.error("Failed to fetch comments:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        message.error("Failed to fetch comments");
      }
    };
    if (districtId && year) {
      fetchComments();
    }
  }, [districtId, year, tableCommentedId]);

  const handleCommentSubmit = async (submitText = commentText) => {
    if (!submitText.trim()) {
      message.error("Comment cannot be empty");
      return;
    }
    if (!user?.user?.username || !districtId || !year) {
      message.error("User or district information is missing");
      return;
    }

    const existingComment = comments.find(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.userRole === normalizedUserRole &&
        comment.districtId === districtId
    );

    if (existingComment && existingComment.username !== currentUsername && !editingCommentId) {
      message.error(`Only one ${currentUserRole.replace("_", " ")} can comment on this indicator for this district.`);
      return;
    }

    const commentDate = new Date().toISOString().split("T")[0].split("-").map(Number);
    const payload = {
      id: 0,
      username: user?.user?.username,
      fullName: user?.user?.fullName,
      userRole: normalizedUserRole,
      type: "DPAT",
      districtId: districtId,
      year: year,
      tableCommented: tableCommentedId,
      comments: submitText,
      commentDate: commentDate,
      updateDate: commentDate,
    };

    try {
      if (editingCommentId) {
        // Update existing comment
        const response = await axios.put(
          `https://dddpadminportal.aoinnovations.org/liza/api/v1/comments/${editingCommentId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("dddp_token") || ""}`,
            },
          }
        );
        setComments(
          comments.map((comment) =>
            comment.id === editingCommentId
              ? { ...comment, comments: submitText, updateDate: commentDate }
              : comment
          )
        );
        message.success("Comment updated successfully");
        setEditingCommentId(null);
        setEditText({});
      } else {
        // Post new comment
        const response = await axios.post(
          "https://dddpadminportal.aoinnovations.org/liza/api/v1/comments",
          payload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("dddp_token") || ""}`,
            },
          }
        );
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

  const handleEditComment = (comment) => {
    if (comment.username !== currentUsername) {
      message.error("You can only edit your own comments.");
      return;
    }
    setEditingCommentId(comment.id);
    setEditText({ ...editText, [comment.id]: comment.comments });
  };

  const handleDeleteComment = async (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment.username !== currentUsername) {
      message.error("You can only delete your own comments.");
      return;
    }
    try {
      await axios.delete(`https://dddpadminportal.aoinnovations.org/liza/api/v1/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("dddp_token") || ""}`,
        },
      });
      setComments(comments.filter((comment) => comment.id !== commentId));
      setEditingCommentId(null);
      setCommentText("");
      setEditText({});
      setShowCommentInput(false);
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

  const canShowCommentInput = () => {
    if (isReviewer) {
      return false; // DPAT QUALITY ASSURANCE cannot comment
    }
    if (editingCommentId) {
      return false;
    }
    return !comments.some(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.userRole === normalizedUserRole &&
        comment.districtId === districtId
    );
  };

  const handleCommentButtonClick = () => {
    if (isReviewer) {
      message.info("DPAT QUALITY ASSURANCE cannot comment on indicators.");
      return;
    }
    if (canShowCommentInput()) {
      setShowCommentInput(!showCommentInput);
    } else {
      message.info("You cannot add a new comment as your role has already commented for this district.");
    }
  };

  const renderCommentInput = () => (
    <div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px", maxWidth: "800px" }}>
      {!isReviewer && (
        <DislikeOutlined
          style={{ cursor: "pointer", fontSize: "30px", marginRight: "10px", flexShrink: 0 }}
          onClick={handleCommentButtonClick}
        />
      )}
      {showCommentInput && canShowCommentInput() && (
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <Avatar
            src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"}
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
              width :"700px"
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
    </div>
  );

  const renderCommentList = () => (
    <div
      style={{
        borderTop: "1px solid #e8e8e8",
        padding: "8px",
        background: "#fff",
        maxWidth: "1000px",
        width: "100%",
        gap: "16px",
      }}
    >
      {comments.length > 0 && (
        <div
          style={{
            flex: 1,
            maxWidth: "700%",
            paddingLeft: "12px",
            marginTop: showCommentInput && canShowCommentInput() ? "16px" : "0",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                padding: "10px",
                border: "1px solid #f0f0f0",
                borderRadius: "6px",
                minWidth: "900px",
                maxWidth: "500px",
                flex: "0 0 auto",
              }}
            >
              <div style={{ display: "flex", marginBottom: "10px" }}>
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
                      {comment.userRole
                        ? comment.userRole.replace("_", " ")
                        : "Unknown Role"}
                      )
                    </h4>
                    {comment.username === currentUsername && (
                      <div style={{ marginLeft: "8px", display: "flex", gap: "8px" }}>
                        <h11
                          style={{
                            marginLeft: "8px",
                            display: "flex",
                            marginRight: "8px",
                          }}
                        >
                          {comment.commentDate.join("/")}
                        </h11>
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
                    <h11 style={{ fontSize: "16px" }}>{comment.comments}</h11>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return children({ renderCommentInput, renderCommentList });
}

export default Comment;