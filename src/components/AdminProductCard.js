import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayCurrency from "../helpers/displayCurrency";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import summaryApi from "../common";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  const changeAvailability = async () => {
    const dataResponse = await fetch(summaryApi.changeAvailability.url, {
      method: summaryApi.changeAvailability.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: data.id,
      }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      fetchdata();
    }
  };

  return (
    <Card
      className={`transition-opacity duration-300 ${
        data.available ? "opacity-100" : "opacity-50"
      }`}
      sx={{ maxWidth: 250, position: "relative", backgroundColor: "#f8f9fa" }}
    >
      <Box position="absolute" top={10} left={10}>
        <Tooltip title={data.available ? "Make Unavailable" : "Make Available"}>
          <IconButton
            onClick={changeAvailability}
            sx={{
              backgroundColor: data.available ? "#f28b82" : "#81c995",
              color: "#fff",
              "&:hover": {
                backgroundColor: data.available ? "#c62828" : "#2e7d32",
              },
            }}
          >
            {data.available ? <FaEye /> : <FaEyeSlash />}
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: 180, // Tamaño uniforme para todas las imágenes
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden", // Evita que las imágenes más grandes sobresalgan
        }}
      >
        <CardMedia
          component="img"
          image={data?.productImages[0].secure_url}
          alt={data?.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain", // Asegura que las imágenes mantengan sus proporciones sin estirarse
          }}
        />
      </Box>

      <CardContent>
        <Typography
          variant="h6"
          component="div"
          noWrap
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {data.productName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {displayCurrency(data.sellingPrice)}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton
          onClick={() => setEditProduct(true)}
          sx={{
            marginLeft: "auto",
            backgroundColor: "#81c995",
            "&:hover": {
              backgroundColor: "#2e7d32",
              color: "#fff",
            },
          }}
        >
          <MdModeEditOutline />
        </IconButton>
      </CardActions>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </Card>
  );
};

export default AdminProductCard;