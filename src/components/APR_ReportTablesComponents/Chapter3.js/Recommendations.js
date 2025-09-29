import React, { useEffect, useState } from "react";
import { Button, message, Avatar, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAuth from "../../../hooks/useAuth";
import instance from "../../../api/cmsapi";

function Recommendations({ year, district, assessmentStatus }) {
  const { user } = useAuth();
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingCommentId, setExistingCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);

  // Determine user role and permissions
  const currentUserRole = user?.user?.userRoles?.find(
    (role) => role.name === "APR USER"
  )?.name || "";
  const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";
  const isQualityAssurance = currentUserRole === "APR USER";
  const tableCommentedId = "APR_Recommendations";

  // Fetch existing comments
  useEffect(() => {
    const fetchComment = async () => {
        setLoading(true);
      if (!district || !year) {
        // message.warning("District ID or year is missing");
        return;
      }
      try {
        setLoading(true);
        const response = await instance.get("comments");
        console.log("API response:", response.data); // Debug: Log the full response
        const filteredComments = response.data.filter(
          (comment) =>
            comment.tableCommented === tableCommentedId &&
            comment.districtId === district && // Use districtId instead of district
            comment.userRole === "APRRecommendations"
        );
        console.log("Filtered comments:", filteredComments); // Debug: Log filtered comments
        setComments(filteredComments);
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
        console.error("Failed to fetch Recommendations comment:", error);
        // message.error("Failed to fetch Recommendations");
      } finally {
        setLoading(false);
      }
    };
    fetchComment();
  }, [district, year, currentUsername, tableCommentedId]);

  const handleSave = async () => {
    if (!editorContent.trim()) {
      message.error("Comment cannot be empty");
      return;
    }
    if (!currentUsername || !district || !year) {
      message.error("User or district information is missing");
      return;
    }
    if (!isQualityAssurance) {
      message.error("Only APR USER can edit the Recommendations");
      return;
    }

    const existingComment = comments.find(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.districtId === district && // Use districtId
        comment.userRole === "APRRecommendations"
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
      userRole: "APRRecommendations",
      type: "APR",
      districtId: district, // Use district directly (string)
      year: year,
      tableCommented: tableCommentedId,
      comments: editorContent,
      commentDate: commentDate,
      updateDate: commentDate,
      dddpDataDate: null,
      dddpData: {}, // Match API response structure
    };

    try {
      setLoading(true);
      if (existingCommentId) {
        await instance.put(`comments/${existingCommentId}`, payload);
        setComments(
          comments.map((comment) =>
            comment.id === existingCommentId
              ? { ...comment, comments: editorContent, updateDate: commentDate }
              : comment
          )
        );
        message.success("Recommendations updated successfully");
        setEditing(false);
      } else {
        const response = await instance.post("comments", payload);
        setComments([...comments, response.data]);
        setExistingCommentId(response.data.id);
        message.success("Recommendations added successfully");
        setEditing(false);
      }
    } catch (error) {
      console.error("Failed to save Recommendations:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      message.error(`Failed to save Recommendations: ${error.response?.data?.message || error.message}`);
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
        comment.districtId === district && // Use districtId
        comment.userRole === "APRRecommendations"
    );
    return !existingComment || existingComment.username === currentUsername;
  };

  const renderCommentList = () => {
    const comment = comments.find(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.districtId === district && // Use districtId
        comment.userRole === "APRRecommendations"
    );
    if (!comment) {
      return <p>No Recommendations available for this district.</p>;
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
        <div
          style={{
            padding: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "6px",
          }}
        >
          <div style={{ display: "flex", marginBottom: "10px" }}>
            {comment.username === currentUsername && isQualityAssurance && (
              <Col>
                <Avatar
                  src={comment.userImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"}
                  style={{ marginRight: "10px", borderRadius: "50%" }}
                  size={32}
                />
              </Col>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                {comment.username === currentUsername && isQualityAssurance && (
                  <h4 style={{ margin: 0, fontSize: "13px" }}>{comment.fullName}</h4>
                )}
                {comment.username === currentUsername && isQualityAssurance && (
                  <EditOutlined
                    style={{ cursor: "pointer", color: "#000000ff", marginLeft: "10px" }}
                    onClick={handleEdit}
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
      </div>
    );
  };

  if (!isQualityAssurance && !comments.length) {
    return (
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3>3.4 Recommendations</h3>
          </div>
          <div className="card-body">
            <div style={{ padding: "20px" }}>
              <p>No Recommendations available for this district.</p>
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
          <h3>3.4 Recommendations</h3>
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
                    Save Recommendations
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

export default Recommendations;