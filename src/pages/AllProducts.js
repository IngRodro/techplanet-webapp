import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import summaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import { Button, Typography, Box } from '@mui/material';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(summaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      {/* Header */}
      <Box
        className="bg-white py-4 px-6 flex justify-between items-center shadow-md mb-4"
        sx={{
          backgroundColor: '#f1f5f9',
          borderBottom: '2px solid #e2e8f0',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          className="font-bold text-gray-800"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 600,
            letterSpacing: '0.05rem',
          }}
        >
          Lista de <span style={{ color: "#3f51b5" }}>Productos</span>
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenUploadProduct(true)}
          sx={{
            backgroundColor: '#1d4ed8',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '1rem',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#1e40af',
            },
          }}
        >
          Agregar Producto
        </Button>
      </Box>

      {/* Product List */}
      <div className="flex flex-wrap gap-5 py-4 h-[calc(100vh-190px)] my-scrollbar overflow-y-scroll px-4">
        {allProduct.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + 'allProduct'}
            fetchdata={fetchAllProduct}
          />
        ))}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;