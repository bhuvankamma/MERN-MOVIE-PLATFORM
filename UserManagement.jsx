// client/src/components/admin/UserManagement.jsx

import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  const toggleSuspend = async (userId, isSuspended) => {
    const token = localStorage.getItem('token');
    await axios.put(`/api/admin/users/${userId}/${isSuspended ? 'unsuspend' : 'suspend'}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>User Management</Typography>
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card>
                <CardContent>
                  <Typography>Name: {user.name}</Typography>
                  <Typography>Email: {user.email}</Typography>
                  <Typography>Status: {user.isSuspended ? 'Suspended' : 'Active'}</Typography>
                  <Button
                    variant="contained"
                    color={user.isSuspended ? 'success' : 'error'}
                    onClick={() => toggleSuspend(user._id, user.isSuspended)}
                    sx={{ mt: 2 }}
                  >
                    {user.isSuspended ? 'Reactivate' : 'Suspend'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
