import React, { useEffect, useState, useCallback } from "react";
import { Button, message, Avatar, Col, Spin } from "antd"; // Added Spin
import { EditOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAuth from "../../../hooks/useAuth";
import instance from "../../../api/cmsapi";

function KIYTBA({ year, district, assessmentStatus }) {
  const { user } = useAuth();
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingCommentId, setExistingCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null); // Added error state

  // Determine user role and permissions
  const currentUserRole = user?.user?.userRoles?.find(
    (role) => role.name === "APR USER"
  )?.name || "";
  const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";
  const isQualityAssurance = currentUserRole === "APR USER";
  const tableCommentedId = "APR_KIYTBA";
  const districtId = district; // Alias for clarity

  // Fetch existing comments
  const fetchComments = useCallback(async () => {
    if (!districtId || !year) {
    
    //   setLoading(false);
      return;
    }
    setLoading(true);
    try {
      console.log("Fetching comments with params:", { districtId, year, tableCommentedId, currentUsername });
      const response = await instance.get(`comments/tables/${districtId}/${year}/APR`);
      console.log("API response:", response.data);
      const filteredComments = response.data.filter(
        (comment) =>
          comment.tableCommented === tableCommentedId &&
          comment.districtId === districtId &&
          (comment.userRole === "APR_RCC" || comment.userRole === "APR_USER")
      );
      console.log("Filtered comments:", filteredComments);
      setComments(filteredComments);
      setError(null);
      const userComment = filteredComments.find(
        (comment) => comment.username === currentUsername
      );
      if (userComment) {
        setEditorContent(userComment.comments || "");
        setExistingCommentId(userComment.id);
      } else {
        setEditorContent("");
        setExistingCommentId(null);
      }
    } catch (error) {
      console.error("", {
      
      });
    //   setError("Failed to fetch Executive Summary");
    //   message.error("Failed to fetch Executive Summary");
    } finally {
      setLoading(false);
    }
  }, [districtId, year, tableCommentedId, currentUsername]);

  // Trigger fetch on mount or dependency change
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSave = async () => {
    if (!editorContent.trim()) {
      message.error("Comment cannot be empty");
      return;
    }
    if (!currentUsername || !districtId || !year) {
      message.error("User or district information is missing");
      return;
    }
    if (!isQualityAssurance) {
      message.error("Only APR USER can edit the Executive Summary");
      return;
    }

    const existingComment = comments.find(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.districtId === districtId &&
        comment.userRole === "APR_USER"
    );

    if (existingComment && existingComment.username !== currentUsername && !existingCommentId) {
      message.error("Only one APR USER can comment for this district.");
      return;
    }

    const commentDate = new Date().toISOString().split("T")[0].split("-").map(Number);
    const payload = {
      id: existingCommentId || 0,
      username: currentUsername,
      fullName: currentFullName,
      userRole: "APR_USER",
      type: "APR",
      districtId: districtId,
      year: year,
      tableCommented: tableCommentedId,
      comments: editorContent,
      commentDate: commentDate,
      updateDate: commentDate,
      dddpDataDate: null,
      dddpData: {},
    };

    try {
      setLoading(true);
      console.log("Saving comment with payload:", payload);
      if (existingCommentId) {
        await instance.put(`comments/${existingCommentId}`, payload);
        setComments(
          comments.map((comment) =>
            comment.id === existingCommentId
              ? { ...comment, comments: editorContent, updateDate: commentDate }
              : comment
          )
        );
        message.success("Issues updated successfully");
        setEditing(false);
      } else {
        const response = await instance.post("comments", payload);
        console.log("Post response:", response.data);
        setComments([...comments, response.data]);
        setExistingCommentId(response.data.id);
        message.success(" added successfully");
        setEditing(false);
      }
    } catch (error) {
    //   console.error("Failed to save Executive Summary:", {
    //     message: error.message,
    //     response: error.response?.data,
    //     status: error.response?.status,
    //   });
    //   message.error(`Failed to save Executive Summary: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const canComment = () => {
    if (!isQualityAssurance) {
      return false;
    }
    const existingComment = comments.find(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.districtId === districtId &&
        comment.userRole === "APR_USER"
    );
    return !existingComment || existingComment.username === currentUsername;
  };

  const renderCommentList = () => {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin tip="Loading comments..." />
        </div>
      );
    }
    if (error) {
      return <p>{error}</p>;
    }
    if (!comments.length) {
      return <p>No Key Issues.</p>;
    }
    return (
      <div
        style={{
          borderTop: "1px solid #e8e8e8",
          padding: "8px",
          background: "#fff",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              padding: "10px",
              border: "1px solid #f0f0f0",
              borderRadius: "6px",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <Col>
                <Avatar
                  src={comment.userImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"}
                  style={{ marginRight: "10px", borderRadius: "50%" }}
                  size={32}
                />
              </Col>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                  <h4 style={{ margin: 0, fontSize: "13px" }}>{comment.fullName}</h4>
                  {comment.username === currentUsername && isQualityAssurance && assessmentStatus && (
                    <EditOutlined
                      style={{ cursor: "pointer", color: "#000000ff", marginLeft: "10px" }}
                      onClick={() => {
                        setEditorContent(comment.comments);
                        setExistingCommentId(comment.id);
                        handleEdit();
                      }}
                    />
                  )}
                </div>
                <div
                  style={{ fontSize: "16px", marginTop: "8px" }}
                  dangerouslySetInnerHTML={{ __html: comment.comments || "" }}
                />
                <Col align="end">
                  <h6 style={{ marginLeft: "8px" }}>{comment.commentDate?.join("/") || "N/A"}</h6>
                </Col>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!isQualityAssurance && !comments.length && !loading && !error) {
    return (
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3>Key Issues yet to be Addressed</h3>
          </div>
          <div className="card-body">
            <div style={{ padding: "20px" }}>
              <p>No Issues available for this district.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <h3>3.3 KEY ISSUES YEST TO BE ADDRESSED</h3>
        </div>
        <div className="card-body">
          <div style={{ padding: "20px" }}>
            {isQualityAssurance && canComment() && (
              <div style={{ display: editing || !existingCommentId ? "block" : "none" }}>
                <ReactQuill
                  value={editorContent}
                  onChange={setEditorContent}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, 4, 5, 6, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
                      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                      [{ align: [] }],
                      [{ color: [] }, { background: [] }],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "code-block",
                    "list",
                    "bullet",
                    "indent",
                    "align",
                    "color",
                    "background",
                    "link",
                    "image",
                    "video",
                  ]}
                  style={{ height: "500px", marginBottom: "50px" }}
                  readOnly={loading}
                />
                <Button
                  type="primary"
                  onClick={handleSave}
                  style={{ marginTop: "10px" }}
                  loading={loading}
                  disabled={loading}
                >
                  <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>
                    Save yet to be Addressed
                  </span>
                </Button>
              </div>
            )}
            {renderCommentList()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KIYTBA;