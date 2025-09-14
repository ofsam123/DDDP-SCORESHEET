import React, { useEffect, useState } from "react";
import { Button, message, Avatar, Col } from "antd";
import { EditOutlined, } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAuth from "../hooks/useAuth";
import instance from "../api/cmsapi";

function QualityAssuranceEditor({ year, districtId,assessmentStatus }) {
  const { user } = useAuth();
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingCommentId, setExistingCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);

  const currentUserRole = user?.user?.userRoles?.find(
    (role) => role.name === "DPAT QUALITY ASSURANCE" || role.name === "DPAT TECHNICAL TEAM"
  )?.name || "";
  const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";
  const isQualityAssurance = currentUserRole === "DPAT QUALITY ASSURANCE";
  const tableCommentedId = "DPAT_MEMO";

  // Fetch existing comments
  useEffect(() => {
    const fetchComment = async () => {
      if (!districtId || !year) {
        return;
      }
      try {
        setLoading(true);
        const response = await instance.get("comments");
        const filteredComments = response.data.filter(
          (comment) => comment.tableCommented === tableCommentedId && comment.districtId === districtId
        );
        setComments(filteredComments);
        const userComment = filteredComments.find(
          (comment) => comment.userRole === "DQA" && comment.username === currentUsername
        );
        if (userComment) {
          setEditorContent(userComment.comments);
          setExistingCommentId(userComment.id);
        }
      } catch (error) {
        console.error("Failed to fetch overall comment:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        message.error("Failed to fetch overall comment");
      } finally {
        setLoading(false);
      }
    };
    fetchComment();
  }, [districtId, year, currentUsername]);

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
      message.error("Only DPAT QUALITY ASSURANCE can comment here");
      return;
    }

    const existingComment = comments.find(
      (comment) => comment.tableCommented === tableCommentedId && comment.districtId === districtId && comment.userRole === "DQA"
    );

    if (existingComment && existingComment.username !== currentUsername && !existingCommentId) {
      message.error("Only one DPAT QUALITY ASSURANCE user can comment for this district.");
      return;
    }

    const commentDate = new Date().toISOString().split("T")[0].split("-").map(Number);
    const payload = {
      id: existingCommentId || 0,
      username: currentUsername,
      fullName: currentFullName,
      userRole: "DQA", // Match API response
      type: "DPAT",
      districtId: districtId,
      year: year,
      tableCommented: tableCommentedId,
      comments: editorContent,
      commentDate: commentDate,
      updateDate: commentDate,
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
        message.success("Overall comment updated successfully");
        setEditing(false);
      } else {
        const response = await instance.post("comments", payload
        );
        setComments([...comments, response.data]);
        setExistingCommentId(response.data.id);
        message.success("Overall comment added successfully");
        setEditing(false);
      }
    } catch (error) {
      console.error("Failed to save overall comment:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      message.error(`Failed to save overall comment: ${error.response?.data?.message || error.message}`);
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
      (comment) => comment.tableCommented === tableCommentedId && comment.districtId === districtId && comment.userRole === "DQA"
    );
    return !existingComment || existingComment.username === currentUsername;
  };

  const renderCommentList = () => {
    const comment = comments.find(
      (comment) => comment.tableCommented === tableCommentedId && comment.districtId === districtId && comment.userRole === "DQA"
    );
    if (!comment) {
      return null;
    }
    return (
      <div
        style={{
          borderTop: "1px solid #e8e8e8",
          padding: "8px",
          background: "#fff",
          // maxWidth: "1000px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "6px",
            // width: "900px",
          }}
        >
          <div style={{ display: "flex", marginBottom: "10px" }}>
            {comment.username === currentUsername && isQualityAssurance && assessmentStatus && (
            <Col>

              <Avatar
                src={comment.userImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"}
                style={{ marginRight: "10px", borderRadius: "50%" }}
                size={32}
              />
            </Col>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", width: "800px" }}>
                {comment.username === currentUsername && isQualityAssurance && assessmentStatus && (
                <h4 style={{ margin: 0, fontSize: "13px" }}>
                  {comment.fullName} (DPAT QUALITY ASSURANCE)

                </h4>
                )}
               
               
                {comment.username === currentUsername && isQualityAssurance && assessmentStatus && (

                  <EditOutlined
                    style={{ cursor: "pointer", color: "#000000ff", marginLeft: "10px" }}
                    onClick={handleEdit}
                  />

                )}
              </div>
              <div
                style={{ fontSize: "16px", marginTop: "8px" }}
                dangerouslySetInnerHTML={{ __html: comment.comments }}
              />
               <Col align="end">
                 <h11 style={{ marginLeft: "8px",  }}>{comment.commentDate.join("/")}</h11>
                </Col>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isQualityAssurance && !comments.length) {
    return <div style={{ padding: "20px" }}>No overall comment available for this district.</div>;
  }

  return (
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
            style={{ marginTop: "10px"}}
            loading={loading}
          >
            <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>Save Memo</span>
            
          </Button>

        </div>
      )}
      {renderCommentList()}
    </div>
  );
}

export default QualityAssuranceEditor;