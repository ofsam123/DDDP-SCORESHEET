import React, { useEffect, useState, useCallback } from "react";
import { Input, Avatar, Col, message, Row, Spin } from "antd";
import {
  CommentOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import useAuth from "../../../hooks/useAuth";
import instance from "../../../api/cmsapi";

function APRComment({ data, year, districtId, tableCommentedId, children,  assessmentStatus}) {
  const { user } = useAuth();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId]  = useState(null);
  const [editText, setEditText] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUserRole = user?.user?.userRoles?.find((role) => role.name === "APR RCC")?.name || "";
  const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";
  const isAPR_RCC = currentUserRole === "APR RCC";

  // Fetch both APR_RCC comments and APR_USER memos
  const fetchComments = useCallback(async () => {
    if (!districtId || !year) return;
    setLoading(true);
    try {
      const response = await instance.get(`comments/tables/${districtId}/${year}/APR`);
      const filteredComments = response.data.filter(
        (comment) =>
          comment.tableCommented === tableCommentedId &&
          comment.districtId === districtId &&
          (comment.userRole === "APR_RCC" || comment.userRole === "APR_USER")
      );
      setComments(filteredComments);
      setError(null);
    } catch (error) {
      // setError("Failed to fetch comments");
      // console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [districtId, year, tableCommentedId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

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
        comment.userRole === "APR_RCC" &&
        comment.username === currentUsername
    );

    const hasOtherComment = comments.some(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.districtId === districtId &&
        comment.userRole === "APR_RCC" &&
        comment.username !== currentUsername
    );

    if (editingCommentId) {
      // Edit case
      const commentToEdit = comments.find((c) => c.id === editingCommentId);
      if (!commentToEdit || commentToEdit.username !== currentUsername || commentToEdit.userRole !== "APR_RCC") {
        message.error("You can only edit your own comment.");
        return;
      }
      const commentDate = new Date().toISOString().split("T")[0].split("-").map(Number);
      const payload = {
        id: commentToEdit.id,
        username: currentUsername,
        fullName: currentFullName,
        userRole: normalizedUserRole,
        type: "APR",
        districtId,
        year,
        tableCommented: tableCommentedId,
        comments: submitText,
        gaps: commentToEdit.gaps || "",
        commentDate: commentToEdit.commentDate || commentDate,
        updateDate: commentDate,
        dddpDataDate: commentDate,
        dddpData: { indicator: tableCommentedId, tables: "" },
      };

      setLoading(true);
      try {
        await instance.put(`comments/${commentToEdit.id}`, payload);
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentToEdit.id
              ? { ...comment, comments: submitText, updateDate: commentDate }
              : comment
          )
        );
        message.success("Comment updated successfully");
        setEditingCommentId(null);
        setEditText({});
        setCommentText("");
        setShowCommentInput(false);
        await fetchComments();
      } catch (error) {
        await fetchComments();
        setError("Failed to save comment");
        message.error(`Failed to save comment: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    } else if (!existingComment && !hasOtherComment) {
      // New comment case
      const commentDate = new Date().toISOString().split("T")[0].split("-").map(Number);
      const payload = {
        id: 0,
        username: currentUsername,
        fullName: currentFullName,
        userRole: normalizedUserRole,
        type: "APR",
        districtId,
        year,
        tableCommented: tableCommentedId,
        comments: submitText,
        gaps: "",
        commentDate: commentDate,
        updateDate: commentDate,
        dddpDataDate: commentDate,
        dddpData: { indicator: tableCommentedId, tables: "" },
      };

      setLoading(true);
      try {
        const tempId = Date.now();
        setComments((prevComments) => [
          ...prevComments,
          { ...payload, id: tempId },
        ]);
        const response = await instance.post("comments", payload);
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === tempId ? { ...comment, id: response.data.id } : comment
          )
        );
        message.success("Comment added successfully");
        setCommentText("");
        setShowCommentInput(false);
        await fetchComments();
      } catch (error) {
        await fetchComments();
        setError("Failed to save comment");
        message.error(`Failed to save comment: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    } else if (existingComment) {
      message.error("You can only submit one comment per table.");
    } else if (hasOtherComment) {
      message.error("Another user has already added a comment to this table.");
    }
  };

  const handleEditComment = (comment) => {
    if (comment.username !== currentUsername || comment.userRole !== "APR_RCC") {
      message.error("You can only edit your own comment.");
      return;
    }
    setEditingCommentId(comment.id);
    setEditText({ ...editText, [comment.id]: comment.comments });
  };

  const handleDeleteComment = async (commentId) => {
    const comment = comments.find((c) => c.id === commentId);
    if (comment.username !== currentUsername || comment.userRole !== "APR_RCC") {
      message.error("You can only delete your own comment.");
      return;
    }
    setLoading(true);
    try {
      await instance.delete(`comments/${commentId}`);
      setComments(comments.filter((comment) => comment.id !== commentId));
      setEditingCommentId(null);
      setCommentText("");
      setEditText({});
      setShowCommentInput(false);
      message.success("Comment deleted successfully");
      await fetchComments();
    } catch (error) {
      await fetchComments();
      setError("Failed to delete comment");
      message.error("Failed to delete comment");
    } finally {
      setLoading(false);
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
    const existingCommentByUser = comments.find(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.districtId === districtId &&
        comment.userRole === "APR_RCC" &&
        comment.username === currentUsername
    );
    const hasOtherComment = comments.some(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.districtId === districtId &&
        comment.userRole === "APR_RCC" &&
        comment.username !== currentUsername
    );
    return !existingCommentByUser && !hasOtherComment;
  };

  const handleCommentButtonClick = () => {
    if (canShowCommentInput()) {
      setShowCommentInput(!showCommentInput);
    } else {
      message.error("Only one person can comment on this table.");
    }
  };

  const renderCommentInput = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "800px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

       
      

        {normalizedUserRole &&  assessmentStatus &&(
          <>
            <span>COMMENT</span>
         
 <CommentOutlined
          style={{ cursor: "pointer", fontSize: "30px", flexShrink: 0 }}
          onClick={handleCommentButtonClick}
        />

        </>
        )}

         
       
      </div>
      {showCommentInput && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Spin spinning={loading}>
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
          </Spin>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      )}
    </div>
  );

  const renderCommentList = () => (
    <Spin spinning={loading}>
      <div
        style={{
          borderTop: "1px solid #e8e8e8",
          padding: "8px",
          background: "#fff",
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
            {comments
              .filter((comment) => comment.comments && comment.comments.trim() !== "")
              .map((comment) => (
                <div
                  key={comment.id}
                  style={{ padding: "10px", border: "1px solid #f0f0f0", borderRadius: "6px" }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Col>
                        <Avatar
                          src={comment.userImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"}
                          style={{ marginRight: "10px", borderRadius: "50%" }}
                          size={32}
                        />
                      </Col>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                          <h4 style={{ margin: 0, fontSize: "13px" }}>
                            {comment.fullName} ({comment.userRole.replace("_", " ")})
                          </h4>
                          {comment.username === currentUsername && comment.userRole === "APR_RCC" && (
                            <div style={{ marginLeft: "8px", display: "flex", gap: "8px" }}>
                              <h11 style={{ marginLeft: "8px", marginRight: "8px" }}>
                                {comment.commentDate.join("/")}
                              </h11>
                              <EditOutlined
                                style={{ cursor: "pointer", color: "#000000ff" }}
                                onClick={() => handleEditComment(comment)}
                              />
                             
                            </div>
                          )}
                        </div>
                        {comment.userRole === "APR_RCC" && editingCommentId === comment.id ? (
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
                          <h11 style={{ fontSize: "16px" }}>
                            {comment.comments}
                          </h11>
                        )}
                      </div>
                    </div>
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