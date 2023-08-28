import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datatable = ({
  listData,
  columns,
  title,
  urlAdd,
  rowHeight,
  startDate,
  onChange,
  getAll,
}) => {
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {urlAdd && (
          <Link to={urlAdd} className="link">
            Thêm mới
          </Link>
        )}
      </div>
      {startDate && (
        <Box
          mb={4}
          display={"flex"}
          justifyContent={"flex-end"}
          gap={1}
          alignItems={"center"}
        >
          <DatePicker selected={startDate} onChange={onChange} />
          <Button variant="outlined" size="small" onClick={getAll}>
            Toàn bộ dữ liệu
          </Button>
        </Box>
      )}

      {listData && (
        <DataGrid
          className="datagrid"
          rows={listData}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          rowHeight={rowHeight || 52}
        />
      )}
    </div>
  );
};

export default Datatable;
