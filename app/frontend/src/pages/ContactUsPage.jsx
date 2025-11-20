import React, { useState } from 'react';
import { Box, Typography, Container, Paper, TextField, Button, Grid } from '@mui/material';
import MessageDialog from '../components/MessageDialog/MessageDialog';

const ContactUsPage = () => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        console.log('Form submitted:', formState);
        setSnackbarOpen(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
    };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Have a question or feedback? Drop us a line!
        </Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
                 <Typography variant="h5" gutterBottom>Get in Touch</Typography>
                 <Typography>Address: 123 Tech Avenue, Silicon Valley, CA 94000</Typography>
                 <Typography>Phone: (123) 456-7890</Typography>
                 <Typography>Email: support@electroshop.com</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField fullWidth required label="Name" name="name" margin="normal" value={formState.name} onChange={handleChange} />
                    <TextField fullWidth required label="Email" name="email" type="email" margin="normal" value={formState.email} onChange={handleChange} />
                    <TextField fullWidth required label="Subject" name="subject" margin="normal" value={formState.subject} onChange={handleChange} />
                    <TextField fullWidth required label="Message" name="message" multiline rows={4} margin="normal" value={formState.message} onChange={handleChange} />
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                        Send Message
                    </Button>
                </Box>
            </Grid>
        </Grid>
      </Paper>
      <MessageDialog 
        open={snackbarOpen} 
        handleClose={() => setSnackbarOpen(false)} 
        message="Your message has been sent successfully!"
      />
    </Container>
  );
};

export default ContactUsPage;