import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';

function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('/api/deliveries');
      setDeliveries(response.data.content);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4">Deliveries</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subscription ID</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.id}</TableCell>
                <TableCell>{delivery.subscriptionId}</TableCell>
                <TableCell>{new Date(delivery.deliveryDate).toLocaleDateString()}</TableCell>
                <TableCell>{delivery.address}</TableCell>
                <TableCell>{delivery.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default DeliveryList;
