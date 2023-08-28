import "./new-data.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createData } from "../../lib/api/data";
import { LinearProgress, Box } from "@mui/material";

const NewData = () => {
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateData = async e => {
    setLoading(true);
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("img", img);
      formData.append("video", video);
      formData.append("link", link);
      formData.append("content", content);
      formData.append("commentContent", commentContent);
      const res = await createData(formData);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Thêm mới dữ liệu"}</h1>
        </div>

        <div className="bottom">
          {loading && (
            <Box position={"absolute"} top={5} left={10} right={10}>
              <LinearProgress />
            </Box>
          )}

          <form onSubmit={handleCreateData}>
            <div className="formInput">
              <label>Link</label>
              <input
                type="text"
                placeholder={"Nhập link"}
                required
                value={link}
                onChange={e => setLink(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Content</label>
              <textarea
                type="text"
                placeholder={"Nhập content"}
                rows={1}
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Content comment</label>
              <textarea
                type="text"
                placeholder={"Nhập content comment"}
                rows={1}
                value={commentContent}
                onChange={e => setCommentContent(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label>Upload ảnh</label>
              <input
                type="file"
                onChange={files => setImg(files.target.files[0])}
                required
                accept="image/*"
              />
            </div>
            <div className="formInput">
              <label>Upload video</label>
              <input
                type="file"
                onChange={files => setVideo(files.target.files[0])}
                required
                accept="video/*"
              />
            </div>

            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"} disabled={loading}>
                Tạo mới
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewData;
