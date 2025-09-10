import React, { useEffect, useState } from "react";
import { Input, Avatar, Col, message, Spin, Progress } from "antd";
import {
  CommentOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import instance from "../../api/cmsapi";

function APRComment({ data, year, districtId, tableCommentedId, children, hideComment }) {
  const { user } = useAuth();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0); // State for progress bar

  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";

  // Simulate progress for the loading bar
  useEffect(() => {
    let progressInterval;
    if (loading) {
      setLoadingProgress(0);
      progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300); // Increment progress every 300ms
    } else {
      setLoadingProgress(100); // Set to 100% when loading completes
      setTimeout(() => setLoadingProgress(0), 500); // Reset after a brief delay
    }
    return () => clearInterval(progressInterval); // Cleanup interval
  }, [loading]);

  // Fetch comments from API
  useEffect(() => {
    const fetchComments = async () => {
      if (!districtId || !year) return;
      setLoading(true);
      try {
        const response = await instance.get(`comments/tables/${districtId}/${year}/APR`);
        const filteredComments = response.data.filter(
          (comment) =>
            comment.tableCommented === tableCommentedId &&
            comment.districtId === districtId
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
        comment.districtId === districtId &&
        comment.username === currentUsername
    );

    if (!existingComment && editingCommentId) {
      message.error("Cannot edit a non-existent comment");
      return;
    }

    const commentDate = new Date().toISOString().split("T")[0].split("-").map(Number);
    const payload = {
      id: existingComment ? existingComment.id : 0,
      username: currentUsername,
      fullName: currentFullName,
      userRole: "NDPC"+ currentUsername,
      type: "APR",
      districtId: districtId,
      year: year,
      tableCommented: tableCommentedId,
      comments: submitText,
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
      } else if (!existingComment) {
        const response = await instance.post("comments", payload);
        setComments([...comments, response.data]);
        message.success("Comment added successfully");
        setCommentText("");
        setShowCommentInput(false);
      } else {
        message.error("You have already commented on this table");
        return;
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
      await instance.delete(`comments/${commentId}`);
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
    if (hideComment) return false;
    if (editingCommentId) return false;
    // Check if the current user has already commented
    const userHasCommented = comments.some(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.districtId === districtId &&
        comment.username === currentUsername
    );
    return !userHasCommented; // Only allow input if the user hasn't commented
  };

  const handleCommentButtonClick = () => {
    if (canShowCommentInput()) {
      setShowCommentInput((prev) => !prev);
    } else {
      message.info("You have already commented on this table or are currently editing.");
    }
  };

  const renderCommentInput = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "800px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>ADD COMMENT</span>
        <CommentOutlined
          style={{ cursor: canShowCommentInput() ? "pointer" : "not-allowed", fontSize: "30px", flexShrink: 0 }}
          onClick={handleCommentButtonClick}
        />
      </div>
      {showCommentInput && canShowCommentInput() && (
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
    </div>
  );

  const renderCommentList = () => (
    <Spin spinning={loading} tip="Loading comments...">
      {loading && (
        <Progress
          percent={loadingProgress}
          status="active"
          style={{ maxWidth: "800px", marginBottom: "16px" }}
        />
      )}
      <div
        style={{
          borderTop: "1px solid #e8e8e8",
          padding: "8px",
          background: "#fff",
         
        //    maxWidth: "800",
        width: "90%",
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
                  padding: "20px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "6px",
                //   maxWidth: "1000px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                              {comment.username ? comment.username.replace("_", " ") : "Unknown Role"})
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
                                {/* <DeleteOutlined
                                  style={{ cursor: "pointer", color: "#ff0000" }}
                                  onClick={() => handleDeleteComment(comment.id)} */}
                                {/* /> */}
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
                            <span style={{ fontSize: "18px" }}>{comment.comments}</span>
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

export default APRComment;