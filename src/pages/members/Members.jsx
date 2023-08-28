import "./members.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useEffect, useState } from "react";
import DialogDelete from "../../components/dialog/DialogDelete";
import { toast } from "react-toastify";
import { deleteMember, listMember } from "../../lib/api/member";

const Members = () => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [memberList, setMemberList] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const handleOpenDialogDelete = id => {
    setIdDelete(id);
    setIsOpenDelete(true);
  };
  const handleClose = () => {
    setIdDelete(null);
    setIsOpenDelete(false);
  };
  const handleConfirmDelete = async () => {
    try {
      const res = await deleteMember(idDelete);
      toast.success(res?.data?.message);
      setMemberList(memberList?.filter(e => e.id !== idDelete));
      handleClose();
    } catch (error) {
      toast.error("Xóa member thất bại");
    }
  };
  const memberColumns = [
    {
      field: "user",
      headerName: "Username",
      width: 230,
      renderCell: params => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              src={
                params.row?.avatarUrl ||
                "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
              }
              alt="avatar"
            />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 230,
    },
    {
      field: "password",
      headerName: "Password",
      width: 230,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: params => {
        return (
          <div className="cellAction">
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
    const getLisMember = async () => {
      const res = await listMember();
      setMemberList(res?.data?.data?.map(el => ({ id: el._id, ...el })));
    };
    getLisMember();
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable
          listData={memberList}
          columns={memberColumns}
          title={"Thêm mới Members"}
          urlAdd={"/members/new"}
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

export default Members;
