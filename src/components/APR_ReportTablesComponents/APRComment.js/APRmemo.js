import React, { useEffect, useState, useCallback } from "react";
import { Button, message, Avatar, Col, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAuth from "../../../hooks/useAuth";
import instance from "../../../api/cmsapi";

function APRmemo({ year, districtId, tableCommentedId }) {
  const { user } = useAuth();
  const [memoContent, setMemoContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const currentUserRole = user?.user?.userRoles?.find((role) => role.name === "APR USER")?.name || "";
  const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";
  const isQualityAssurance = currentUserRole === "APR USER";

  // Fetch existing comments
  const fetchComments = useCallback(async () => {
    if (!districtId || !year) return;
    setLoading(true);
    try {
      const response = await instance.get(`comments/tables/${districtId}/${year}/APR`);
      const filteredComments = response.data.filter(
        (comment) =>
          comment.tableCommented === tableCommentedId &&
          comment.districtId === districtId &&
          comment.userRole === "APR_USER"
      );
      setComments(filteredComments);
      setError(null);
    } catch (error) {
      setError("Failed to fetch comments");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [districtId, year, tableCommentedId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSaveMemo = async () => {
    if (!memoContent.trim()) {
      message.error("Memo cannot be empty");
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
      id: existingComment?.id || 0,
      username: currentUsername,
      fullName: currentFullName,
      userRole: normalizedUserRole,
      type: "APR",
      districtId,
      year,
      tableCommented: tableCommentedId,
      comments: existingComment?.comments || "",
      gaps: memoContent,
      commentDate: existingComment?.commentDate || commentDate,
      updateDate: commentDate,
      dddpDataDate: commentDate,
      dddpData: { indicator: tableCommentedId },
    };

    setLoading(true);
    try {
      let response;
      if (existingComment) {
        // Optimistic update for existing
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === existingComment.id
              ? { ...comment, gaps: memoContent, updateDate: commentDate }
              : comment
          )
        );
        response = await instance.put(`comments/${existingComment.id}`, payload);
        message.success("Memo updated successfully");
      } else {
        // Optimistic update for new
        const tempId = Date.now(); // Temporary ID for optimistic UI
        setComments((prevComments) => [
          ...prevComments,
          { ...payload, id: tempId },
        ]);
        response = await instance.post("comments", payload);
        // Replace tempId with actual ID after successful post
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === tempId ? { ...comment, id: response.data.id } : comment
          )
        );
        message.success("Memo added successfully");
      }
      setMemoContent("");
      setEditing(false);
      // Refetch to sync with server
      await fetchComments();
    } catch (error) {
      // Rollback optimistic update on error
      await fetchComments(); // Refetch to revert to server state
      setError("Failed to save memo");
      message.error(`Failed to save memo: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const canEditMemo = () => isQualityAssurance;

  const renderMemoList = () => {
    const comment = comments.find(
      (comment) =>
        comment.tableCommented === tableCommentedId &&
        comment.districtId === districtId &&
        comment.userRole === normalizedUserRole
    );
    if (!comment) return null;
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
        <div style={{ padding: "10px", border: "1px solid #f0f0f0", borderRadius: "6px" }}>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            {comment.username === currentUsername && canEditMemo() && (
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
                {comment.username === currentUsername && canEditMemo() && (
                  <h4 style={{ margin: 0, fontSize: "13px" }}>
                    {comment.fullName} ({comment.userRole})
                  </h4>
                )}
                {comment.username === currentUsername && canEditMemo() && (
                  <EditOutlined
                    style={{ cursor: "pointer", color: "#000000ff", marginLeft: "10px" }}
                    onClick={handleEdit}
                  />
                )}
              </div>
              <div
                style={{ fontSize: "16px", marginTop: "8px" }}
                dangerouslySetInnerHTML={{ __html: comment.gaps || "No memo available" }}
              />
              <Col align="end">
                <h11 style={{ marginLeft: "8px" }}>{comment.commentDate.join("/")}</h11>
              </Col>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isQualityAssurance && !comments.length) {
    return <div style={{ padding: "20px" }}>No overall memo available for this district.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {canEditMemo() && (
        <div style={{ display: editing || !comments.length ? "block" : "none" }}>
          <Spin spinning={loading}>
            <ReactQuill
              value={memoContent}
              onChange={setMemoContent}
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
              style={{ height: "100px", marginBottom: "50px" }}
            />
            <Button
              type="primary"
              onClick={handleSaveMemo}
              style={{ marginTop: "10px" }}
              disabled={loading}
            >
              <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>SAVE TABLE DISCRIPTION</span>
            </Button>
          </Spin>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      )}
      {renderMemoList()}
    </div>
  );
}

export default APRmemo;