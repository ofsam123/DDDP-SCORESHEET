
import React, { useEffect, useState } from "react";
import { Button, message, Avatar, Col, Progress, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useAuth from "../hooks/useAuth";
import instance from "../api/cmsapi";

function PetitionCommittee({ year, districtId, assessmentStatus: initialAssessmentStatus }) {
  const { user } = useAuth();
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressLoad, setProgressLoad] = useState(false);
  const [existingCommentId, setExistingCommentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [assessmentStatus, setAssessmentStatus] = useState(initialAssessmentStatus);

  const currentUserRole = user?.user?.userRoles?.find(
    (role) => role.name === "DPAT PETITION COMMITTEE"
  )?.name || "";
  const normalizedUserRole = currentUserRole ? currentUserRole.replace(" ", "_").toUpperCase() : "";
  const currentUsername = user?.user?.username || "";
  const currentFullName = user?.user?.fullName || "";
  const isPetitionCommittee = currentUserRole === "DPAT PETITION COMMITTEE";
  const tableCommentedId = year + "petition" + districtId;
  const tableCommentedId2 = year + "petitioncommittee" + districtId;

  const maxFileSize = 1 * 1024 * 1024; // 1MB
  const allowedFileTypes = ["application/pdf", "image/jpeg", "image/png"];

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
          (comment) => comment.tableCommented === tableCommentedId2 && comment.districtId === districtId
        );
        setComments(filteredComments);
        const userComment = filteredComments.find(
          (comment) => comment.userRole === "DPC" && comment.username === currentUsername
        );
        if (userComment) {
          setEditorContent(userComment.comments);
          setExistingCommentId(userComment.id);
        }
      } catch (error) {
        console.error("Failed to fetch Petition:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        message.error("Failed to fetch Petition");
      } finally {
        setLoading(false);
      }
    };
    fetchComment();
  }, [districtId, year, currentUsername]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!districtId || !year) {
        message.error("District or year information is missing");
        return;
      }
      try {
        setLoading(true);
        // Try specific endpoint first
        let response;
        try {
          response = await instance.get(`comments/tables/${districtId}/${year}/DPAT`);
        } catch (specificError) {
          console.warn("Specific endpoint failed, falling back to generic comments endpoint:", specificError);
          response = await instance.get("comments");
        }
        console.log("Fetched comments:", response.data); // Debug log
        const filteredComments = response.data.filter(
          (comment) =>
            comment.tableCommented === tableCommentedId &&
            comment.districtId === districtId &&
            (comment.userRole === "DDUSER" || comment.userRole === "DPC")
        );
        console.log("Filtered comments:", filteredComments); // Debug log
        setComments(filteredComments);
        const committeeComment = filteredComments.find(
          (comment) => comment.userRole === "DPC" && comment.username === currentUsername
        );
        if (committeeComment) {
          setEditorContent(committeeComment.comments);
          setExistingCommentId(committeeComment.id);
          if (committeeComment.fileUrl) {
            setFile({ name: committeeComment.fileName, url: committeeComment.fileUrl });
          }
        }
      } catch (error) {
        console.error("Failed to fetch comments:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        // message.error("Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [districtId, year, currentUsername]);

  const handleFileChange = (info) => {
    const selectedFile = info.file;
    if (selectedFile) {
      if (selectedFile.size > maxFileSize) {
        setUploadError("File size exceeds 1MB limit. Please choose a smaller file.");
        setFile(null);
        return;
      }
      if (!allowedFileTypes.includes(selectedFile.type)) {
        setUploadError("Only PDF, JPEG, and PNG files are allowed.");
        setFile(null);
        return;
      }
      setUploadError(null);
      setFile(selectedFile);
      setUploadProgress(0);
    }
  };

  const handleSaveComment = async (isDraft = false) => {
    if (!editorContent.trim()) {
      message.error("Comment field cannot be empty");
      return;
    }
    if (!currentUsername || !districtId || !year) {
      message.error("User or district information is missing");
      return;
    }
    if (!isPetitionCommittee) {
      message.error("Only DPAT PETITION COMMITTEE can comment here");
      return;
    }

    const existingComment = comments.find(
      (comment) => comment.tableCommented === tableCommentedId2 && comment.districtId === districtId && comment.userRole === "DPC"
    );

    if (existingComment && existingComment.username !== currentUsername && !existingCommentId) {
      message.error("Only one DPAT PETITION COMMITTEE member can comment for this district.");
      return;
    }

    const commentDate = new Date().toISOString().split("T")[0].split("-").map(Number);
   
      const payload = {
      id: existingCommentId || 0,
      username: currentUsername,
      fullName: currentFullName,
      userRole: "DPC", 
      type: "DPAT",
      districtId: districtId,
      year: year,
      tableCommented: tableCommentedId2,
      comments: editorContent,
      commentDate: commentDate,
      updateDate: commentDate,
    };
    

    try {
      setLoading(true);
      if (existingCommentId) {
        const response = await instance.put(`comments/${existingCommentId}`, payload, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        });
        setComments(
          comments.map((comment) =>
            comment.id === existingCommentId
              ? { ...comment, comments: editorContent, updateDate: commentDate, fileUrl: response.data.fileUrl || comment.fileUrl, fileName: response.data.fileName || comment.fileName, status: isDraft ? "draft" : "submitted" }
              : comment
          )
        );
        message.success(isDraft ? "Draft saved successfully" : "Comment submitted successfully");
      } else {
        const response = await instance.post(isDraft ? "comments/draft" : "comments", payload, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          },
        });
        setComments([...comments, response.data]);
        setExistingCommentId(response.data.id);
        if (response.data.fileUrl) {
          setFile({ name: response.data.fileName, url: response.data.fileUrl });
        }
        message.success(isDraft ? "Draft saved successfully" : "Comment submitted successfully");
      }
      if (!isDraft) {
        setEditing(false);
      }
    } catch (error) {
      console.error(`Failed to ${isDraft ? "save draft" : "submit comment"}:`, {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      if (error.response?.status === 413) {
        message.error("File or data too large. Please use a file smaller than 1MB or reduce text content.");
      } else {
        message.error(`Failed to ${isDraft ? "save draft" : "submit comment"}: ${error.response?.data?.message || error.message}`);
      }
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  
  const handleEdit = () => {
    setEditing(true);
  };

  const canComment = () => {
    if (!isPetitionCommittee) {
      return false;
    }
    const existingComment = comments.find(
      (comment) => comment.tableCommented === tableCommentedId && comment.districtId === districtId && comment.userRole === "DPC"
    );
    return !existingComment || existingComment.username === currentUsername;
  };

  const hasSubmittedComment = () => {
    return comments.some(
      (comment) => comment.tableCommented === tableCommentedId && comment.districtId === districtId && comment.userRole === "DPC" && comment.status === "submitted"
    );
  };

  const renderPetitionList = () => {
    const petition = comments.find(
      (comment) => comment.tableCommented === tableCommentedId && comment.districtId === districtId && comment.userRole === "DDUSER"
    );
    if (!petition) {
      return <div style={{ padding: "20px" }}>No petition available for this district.</div>;
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
        <h3 style={{ textAlign: "center", padding: "10px" }}>District Petition</h3>
        <div
          style={{
            padding: "10px",
            border: "1px solid #f0f0f0",
            borderRadius: "6px",
          }}
        >
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <Col>
              <Avatar
                src={petition.userImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_JlCFnIGX5omgjEjgV9F3sBRq14eTERK9w&s"}
                style={{ marginRight: "10px", borderRadius: "50%" }}
                size={32}
              />
            </Col>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: "13px" }}>
                {petition.fullName} (DPAT DISTRICT USERS)
              </h4>
              <div
                style={{ fontSize: "16px", marginTop: "8px" }}
                dangerouslySetInnerHTML={{ __html: petition.comments }}
              />
              {petition.fileUrl && (
                <div style={{ marginTop: "8px" }}>
                  <a href={petition.fileUrl} target="_blank" rel="noopener noreferrer">
                    Attached File: {petition.fileName}
                  </a>
                </div>
              )}
              <Col align="end">
                <h11 style={{ marginLeft: "8px" }}>{petition.commentDate.join("/")}</h11>
              </Col>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderCommentList = () => {
      const comment = comments.find(
        (comment) => comment.tableCommented === tableCommentedId && comment.districtId === districtId && comment.userRole === "DDUSER"
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
              {comment.username === currentUsername && isPetitionCommittee && assessmentStatus && (
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
                  {comment.username === currentUsername && isPetitionCommittee && assessmentStatus && (
                  <h4 style={{ margin: 0, fontSize: "13px" }}>
                    {comment.fullName} (DPAT PETITION COMMITTEE)
  
                  </h4>
                  )}
                 
                 
                  {comment.username === currentUsername && isPetitionCommittee && assessmentStatus && (
  
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

  

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading comments...</div>;
  }

  if (!isPetitionCommittee && !comments.length) {
    return <div style={{ padding: "20px" }}>No</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {renderPetitionList()}
      {isPetitionCommittee && canComment() && (
        <div style={{ display: editing || !existingCommentId ? "block" : "none" }}>
          <h3 style={{ textAlign: "center", padding: "10px" }}>PETITION COMMITTEE COMMENT</h3>
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
            readOnly={loading || progressLoad}
          />
          <div style={{ marginBottom: "20px" }}>
          
            {file && <span style={{ marginLeft: "10px" }}>{file.name}</span>}
            {uploadError && <div style={{ color: "red", marginTop: "5px" }}>{uploadError}</div>}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <Progress percent={uploadProgress} size="small" style={{ width: "200px", marginTop: "5px" }} />
            )}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={() => handleSaveComment(true)}
              style={{ marginTop: "10px" }}
              loading={loading || progressLoad}
              disabled={loading || progressLoad}
            >
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>Save Draft</span>
            </Button>
            <Button
              type="primary"
              onClick={() => handleSaveComment(false)}
              style={{ marginTop: "10px" }}
              loading={loading || progressLoad}
              disabled={loading || progressLoad}
            >
              <span style={{ color: "white", fontSize: "14px", fontWeight: "bold" }}>Submit Comment</span>
            </Button>
      
          </div>
        </div>
      )}
      {renderCommentList()}
    </div>
  );
}

export default PetitionCommittee;