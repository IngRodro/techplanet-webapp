import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import ChangeUserRole from "../components/ChangeUserRole";
import summaryApi from "../common";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    id: "",
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(summaryApi.allUser.url, {
      method: summaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Lista de <span style={{ color: "#3f51b5" }}>Usuarios</span>
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead style={{ backgroundColor: "#3f51b5" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}>#</TableCell>
              <TableCell style={{ color: "white" }}>Nombre</TableCell>
              <TableCell style={{ color: "white" }}>Email</TableCell>
              <TableCell style={{ color: "white" }}>Rol</TableCell>
              <TableCell style={{ color: "white" }}>Fecha de Creación</TableCell>
              <TableCell style={{ color: "white", textAlign: "center" }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUser.map((el, index) => (
              <TableRow key={el.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{el?.name || "N/A"}</TableCell>
                <TableCell>{el?.email}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    style={{
                      color: el?.role === "admin" ? "red" : "blue",
                      fontWeight: "bold",
                    }}
                  >
                    {el?.role}
                  </Typography>
                </TableCell>
                <TableCell>{moment(el?.createdAt).format("LL")}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails.id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
