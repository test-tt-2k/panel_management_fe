import "./datas.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteData, listData } from "../../lib/api/data";
import { Box } from "@mui/material";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";

const Datas = () => {
  const [dataList, setDataList] = useState(null);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => {
    setIdDelete(null);
    setIsOpenDelete(false);
  };

  const handleOpenDialogDelete = id => {
    setIdDelete(id);
    setIsOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteData(idDelete);
      toast.success(res?.data?.message);
      setDataList(dataList?.filter(e => e.id !== idDelete));
    } catch (error) {
      toast.error("Xóa data thất bại");
    }
    handleClose();
  };

  const shopColumns = [
    {
      field: "imgId",
      headerName: "Ảnh",
      width: 150,
      renderCell: params => {
        return (
          <Box>
            <div className="cellAction">
              <img
                src={`https://drive.google.com/uc?id=${params.row.imgId}`}
                width={100}
                height={100}
                alt={params.row.imgId}
              />
            </div>
          </Box>
        );
      },
    },
    {
      field: "link",
      headerName: "Link",
      width: 150,
    },
    {
      field: "content",
      headerName: "Content",
      width: 150,
    },
    {
      field: "commentContent",
      headerName: "Content comment",
      width: 150,
    },
    {
      field: "videoUrl",
      headerName: "Video Url",
      width: 350,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: params => {
        return (
          <div className="cellAction">
            <Link
              to={`/datas/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Chỉnh sửa</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleOpenDialogDelete(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const getListData = async () => {
      const res = await listData(startDate);
      setDataList(res.data.data?.map(el => ({ id: el._id, ...el })));
    };
    getListData();
  }, [startDate]);

  const getAllData = async () => {
    const res = await listData();
    setDataList(res.data.data?.map(el => ({ id: el._id, ...el })));
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <Datatable
          listData={dataList}
          columns={shopColumns}
          title={"Thêm mới dữ liệu"}
          urlAdd={"/datas/new"}
          rowHeight={150}
          startDate={startDate}
          onChange={data => setStartDate(data)}
          getAll={getAllData}
        />
      </div>
      <DialogDelete
        open={isOpenDelete}
        handleClose={handleClose}
        handleOk={handleConfirmDelete}
      />
    </div>
  );
};

export default Datas;
