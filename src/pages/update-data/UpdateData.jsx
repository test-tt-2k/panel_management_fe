import "./update-data.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getDetail, updateData } from "../../lib/api/data";

const UpdateData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [link, setLink] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imgId, setImgId] = useState("");

  const handleUpdateShop = async e => {
    try {
      e.preventDefault();
      await updateData(id, { link, commentContent, content });
      navigate("/datas");
      return toast.success("Cập nhật  thành công");
    } catch (error) {
      return toast.error("Cập nhật  thất bại, ");
    }
  };

  useEffect(() => {
    const getCurrentData = async () => {
      const res = await getDetail(id);
      setLink(res.data.data.link);
      setContent(res.data.data.content);
      setCommentContent(res.data.data.commentContent);
      setVideoUrl(res.data.data.videoUrl);
      setImgId(res.data.data.imgId);
    };
    getCurrentData();
  }, [id]);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{"Cập nhật"}</h1>
        </div>
        <div className="bottom">
          <form onSubmit={handleUpdateShop}>
            <div style={{ width: "100%", textAlign: "center" }}>
              <img
                src={`https://drive.google.com/uc?id=${imgId}`}
                width={200}
                height={200}
                alt={imgId}
              />
            </div>
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
              <label>Video url</label>
              <input type="text" value={videoUrl} disabled />
            </div>

            <div style={{ width: "100%", textAlign: "center" }}>
              <button type={"submit"}>Cập nhật</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateData;
