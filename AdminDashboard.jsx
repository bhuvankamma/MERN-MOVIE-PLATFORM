import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Paper,
} from '@mui/material';
import {
  Group,
  Movie,
  PeopleAlt,
  Report,
  Insights,
  ChildCare,
  ShowChart,
  Block,
  WarningAmber,
  Paid,
  Notifications,
  Dashboard,
  Menu as MenuIcon,
  Logout,
  VideoLibrary,
  Close,
} from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { motion } from 'framer-motion';
import { useAuth } from '../auth_temp/AuthContext';
import axios from 'axios';

import TotalUsersCard from '../components/admin/TotalUsersCard';
import ManageMovies from '../components/admin/ManageMovies';
import TrailerManager from '../pages/TrailerManager';
import UserManagement from '../components/admin/UserManagement';
import ReviewModeration from '../components/admin/ReviewModeration';
import NotificationBanner from '../components/admin/NotificationBanner';
import AnalyticsChart from '../components/admin/AnalyticsChart';
import AdminMessages from '../components/admin/AdminMessages';

import {
  LineChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  const [caption, setCaption] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const welcomeCaptions = [
    "Running the show like a boss! 🎬",
    "Your command center awaits 🚀",
    "Ah, the mighty one has returned. Kneel, bugs! 🧹",
    "Guess who's back to fix everyone's mess? 😏",
    "Admin mode: Activated. Drama incoming. 🎭",
    "You're the firewall between chaos and order 🔥🧊",
    "Time to push buttons and look important 🧑‍💻",
    "Legendary moves only, Admin. 💡",
  ];

  const adminSections = [
    { label: 'Total Users', icon: <Group /> },
    { label: 'Manage Movies', icon: <Movie /> },
    { label: 'Trailer Manager', icon: <VideoLibrary /> },
    { label: 'User Management', icon: <PeopleAlt /> },
    { label: 'Comment Moderation', icon: <Report /> },
    { label: 'Admin Notifications', icon: <Notifications /> },
    { label: 'Analytics Dashboard', icon: <Insights /> },
    { label: 'Chart Overview', icon: <ShowChart /> },
    { label: 'Suspended Users', icon: <Block /> },
    { label: 'Abusive Reports', icon: <WarningAmber /> },
    { label: 'Age Restrictions', icon: <ChildCare /> },
    { label: 'Subscription Monitoring', icon: <Paid /> },
    { label: 'Admin Messages', icon: <MailOutlineIcon /> },
    { label: 'Admin Inbox', icon: <MailOutlineIcon /> },
  ];

  const chartData = [
    { name: 'Week 1', views: 2000, subs: 400 },
    { name: 'Week 2', views: 3500, subs: 600 },
    { name: 'Week 3', views: 3000, subs: 550 },
    { name: 'Week 4', views: 4000, subs: 700 },
  ];

  // Timer variables for inactivity detection
  let inactivityTimer;

  useEffect(() => {
    const randomCaption = welcomeCaptions[Math.floor(Math.random() * welcomeCaptions.length)];
    setCaption(randomCaption);

    const fetchUnreadMessages = async () => {
      try {
        const response = await axios.get('/api/messages/unread-count');
        const count = response.data.unreadCount;
        setUnreadMessagesCount(count);

        // Show snackbar on dashboard load if unread messages exist
        if (count > 0) {
          setSnackbarMessage(`You have ${count} unread message${count > 1 ? 's' : ''}`);
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('Error fetching unread messages:', error);
      }
    };

    fetchUnreadMessages();

    // Start the inactivity timer
    startInactivityTimer();

    // Event listeners to reset inactivity timer
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);

    return () => {
      // Cleanup event listeners and timer on component unmount
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, []);

  const startInactivityTimer = () => {
    inactivityTimer = setTimeout(() => {
      handleSignOut(); // Log out after 10 minutes of inactivity
    }, 30000); // 5 minutes = 300,000 milliseconds
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer); // Clear the existing timer
    startInactivityTimer(); // Restart the timer
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSignOut = () => {
    logoutUser();
    navigate('/');
  };

  const handleSectionClick = (label) => {
    setActiveSection(label);
    setSidebarOpen(false);
    setSnackbarMessage(`✅ "${label}" loaded!`);
    setSnackbarOpen(true);
  };

  const handleCloseSection = () => setActiveSection('');

  const renderSectionComponent = () => {
    switch (activeSection) {
      case 'Total Users':
        return <TotalUsersCard />;
      case 'Manage Movies':
        return <ManageMovies />;
      case 'Trailer Manager':
        return <TrailerManager />;
      case 'User Management':
        return <UserManagement />;
      case 'Comment Moderation':
        return <ReviewModeration />;
      case 'Admin Notifications':
        return <NotificationBanner />;
      case 'Analytics Dashboard':
        return <AnalyticsChart />;
      case 'Chart Overview':
        return (
          <Card sx={{ backgroundColor: '#fff', color: '#333', borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                📊 Viewership & Subscriptions
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#ff4081" strokeWidth={2} />
                  <Line type="monotone" dataKey="subs" stroke="#3f51b5" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        );
      case 'Admin Messages':
        return <AdminMessages />;
      case 'Suspended Users':
      case 'Abusive Reports':
      case 'Age Restrictions':
      case 'Subscription Monitoring':
      case 'Admin Inbox':
        return <Typography variant="body2" color="#ccc">Feature coming soon...</Typography>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#0f0f0f', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" sx={{ backgroundColor: '#333', color: '#00e676' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Drawer
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        PaperProps={{ sx: { backgroundColor: '#1e1e1e', color: '#fff', width: 240 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold">🎛️ Admin Menu</Typography>
        </Box>
        <Divider />
        <List>
          {adminSections.map((section, idx) => (
            <ListItem
              button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                handleSectionClick(section.label);
              }}
              sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#333' } }}
            >
              <ListItemIcon sx={{ color: '#00e676' }}>{section.icon}</ListItemIcon>
              <ListItemText primary={section.label} />
              {section.label === 'Admin Messages' && unreadMessagesCount > 0 && (
                <Typography variant="body2" sx={{ color: '#f44336' }}>
                  ({unreadMessagesCount} new)
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={{ px: 4, pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={toggleSidebar} sx={{ color: '#00e676' }}>
            <MenuIcon />
          </IconButton>
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              Hello, {user?.name}
            </Typography>
          </motion.div>
        </Box>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<Logout />}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>

      <Box sx={{ flex: 1, p: 3, backgroundColor: '#121212', overflow: 'auto' }}>
        <Typography variant="h6" fontWeight="bold">{caption}</Typography>
        {renderSectionComponent()}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
