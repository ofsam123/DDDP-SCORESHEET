import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Input, Avatar, Col } from "antd";
import { CommentOutlined, SendOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function GAMeeting({ data, year, columns }) {
    const { user } = useAuth();
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);

    const currentUserRole = user?.user?.role; // Assuming role is available in user object (e.g., "Accessor" or "Reviewer")

    const handleCommentSubmit = () => {
        if (commentText.trim()) {
            if (editingCommentId) {
                // Edit existing comment
                setComments(
                    comments.map((comment) =>
                        comment.id === editingCommentId
                            ? { ...comment, text: commentText }
                            : comment
                    )
                );
                setEditingCommentId(null);
            } else {
                // Check if user has already commented
                const hasCommented = comments.some(
                    (comment) => comment.userRole === currentUserRole
                );
                if (!hasCommented) {
                    setComments([
                        ...comments,
                        {
                            id: Date.now(),
                            text: commentText,
                            userRole: currentUserRole,
                            userName: user?.user?.fullName,
                            userImage: user?.user?.image,
                        },
                    ]);
                }
            }
            setCommentText("");
            setShowCommentInput(true);
        }
    };

    const handleEditComment = (comment) => {
        setCommentText(comment.text);
        setEditingCommentId(comment.id);
        setShowCommentInput(true);
    };

    const handleDeleteComment = (commentId) => {
        setComments(comments.filter((comment) => comment.id !== commentId));
        setEditingCommentId(null);
        setCommentText("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleCommentSubmit();
        }
    };

    return (
        <>
            <Title level={3}>CI 1.0 General Assembly Meetings and Approvals - 1.1 Meetings of the General Assembly </Title>
            <Title level={4} style={{ marginTop: "10px" }}>Assessment Guide/ Requirement</Title>

            <Content>
                From the District Coordinating Director (DCD) receive information on the General Assembly Meetings held in <strong>{year}</strong>:<br /><br />
                <ol>
                    <li type="i">
                        If the Assembly held at least three ordinary Meetings in <strong>{year}</strong> with Minutes of Meetings duly recorded and signed by both PM and DCD;
                    </li>
                    <li type="i" className="py-1">
                        If the ordinary meeting was convened through a notice of meeting issued within two weeks before the meeting date and duly signed by the Presiding Member/Convener; and
                    </li>
                    <li type="i">
                        If there is evidence of decisions (e.g. Resolutions; if applicable) made by the General Assembly during the convened meetings. </li>
                </ol>

                <i>Then the CI is fulfilled</i>
            </Content>

            <Title level={5} style={{ marginTop: "20px" }}>CI Result: <strong style={{ color: data?.fulfillment === "Fulfilled" ? "green" : "red", }}>
                {data?.fulfillment}</strong>
            </Title>

            <Title level={5} style={{ marginTop: "10px" }}>Number of Decisions: <strong>{data?.numberOfDecision}</strong> </Title>
            <Title level={4} style={{ marginTop: "20px" }}>
                Illustration of Meetings held in the table below:
            </Title>

            {data?.meetings && <Table columns={columns} dataSource={data?.meetings} pagination={false} bordered />}

            <CommentOutlined 
                style={{ marginLeft: "10px", cursor: "pointer", fontSize: "30px", marginTop: "20px" }} 
                onClick={() => setShowCommentInput(!showCommentInput)} 
            />
                
            {showCommentInput && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        borderTop: "1px solid #e8e8e8",
                        padding: "8px",
                        background: "#fff",
                        maxWidth: "1000px",
                        width: "100%",
                        gap: "16px",
                    }}
                >
                    {/* Left: Input and Send */}
                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: "600px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                                src={user?.user?.image}
                                style={{ marginRight: "10px", borderRadius: "50%" }}
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
                                }}
                            />
                            {commentText.trim() && (
                                <SendOutlined
                                    className="text-blue-500 cursor-pointer"
                                    style={{ fontSize: "20px", marginLeft: "8px", marginTop: "8px" }}
                                    onClick={handleCommentSubmit}
                                />
                            )}
                        </div>
                    </div>

                    {/* Right: Comment List */}
                    {comments.length > 0 && (
                        <div
                            style={{
                                flex: 1,
                                maxWidth: "500px",
                                paddingLeft: "12px",
                            }}
                        >
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    style={{
                                        padding: "10px",
                                        borderBottom: "1px solid #f0f0f0",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <div style={{ display: "flex", marginBottom: "10px" }}>
                                        <Col>
                                            <Avatar
                                                src={comment.userImage}
                                                style={{ marginRight: "10px", borderRadius: "50%" }}
                                                size={32}
                                            />
                                        </Col>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <h4 style={{ margin: 0, fontSize: "13px" }}>
                                                    {comment.userName} ({comment.userRole})
                                                </h4>
                                                {comment.userRole === currentUserRole && (
                                                    <div style={{ marginLeft: "8px", display: "flex", gap: "8px" }}>
                                                        <EditOutlined
                                                            style={{ cursor: "pointer", color: "#595959" }}
                                                            onClick={() => handleEditComment(comment)}
                                                        />
                                                        <DeleteOutlined
                                                            style={{ cursor: "pointer", color: "#ff4d4f" }}
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <Text>{comment.text}</Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
            )}
        </>
    );
}

export default GAMeeting;