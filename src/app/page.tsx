'use client';

import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Project } from './data/projectsData';

import Type from '@/app/components/type';
import { useProjectStore } from '@/store/public-project-store';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './components/header';
import LoadingBackdrop from './components/LoadingBackdrop';
import ProjectCardSkeleton from './components/ProjectSkeliton';
const Title = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>(useProjectStore((state) => state.projects));
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  // const publicProjects = useProjectStore((state) => state.projects);
  const setPublicProjects = useProjectStore((state) => state.setProjects);
  // async function fetchAll() {
  //   const res = await axios.get('/api/projects/visible');
  //   setProjects(res.data);
  // }
  async function fetchAll() {
    if (!projects || projects.length === 0) {
      try {
        setLoadingProjects(true);
        const res = await axios.get('/api/projects/visible');
        setProjects(res.data);
        setPublicProjects(res.data);
      } finally {
        setLoadingProjects(false);
      }
    }
  }

  useEffect(() => {
    fetchAll();
  });

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const router = useRouter();
  const recentProjects = projects.slice(0, 3);
  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    console.log(mobileMenuOpen);
    setMobileMenuOpen(false);
  };

  const handleViewDetails = (projectId: string | number) => {
    setLoading(true);
    window.scrollTo(0, 0);

    router.push(`/project/${projectId}`);
  };

  const handleViewAllDetails = () => {
    setLoading(true);
    window.scrollTo(0, 0);

    router.push(`/all-projects`);
  };

  // const AdminViewAll = () => {
  //   window.scrollTo(0, 0);
  //   router.push(`/admin/projects`);
  // };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <Box
        id="home"
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          p: 4,
        }}
      >
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          I am pankajan
        </Title>
        <Type />
        <Typography variant="h6" gutterBottom sx={{ maxWidth: 600 }}>
          I am an aspiring Electronic Engineer who loves sharing my experience with community.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => handleNavClick('projects')}
        >
          View My Work
        </Button>
        {/* <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => AdminViewAll()}>
          Admin View All Projects
        </Button> */}
      </Box>

      {/* About Section */}
      <Container id="about" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto' }}>
        Passionate Electronic & Telecommunication Engineering graduate with hands-on experience in Accelerators, FPGAs, Digital Design, DSP, VLSI, RF, Neuromorphic computing, Quantum Computing, AI/Machine
        Learning, Mathematics, and Embedded Systems, with a strong aptitude for creative, technical, and problem-solving skills. Proven ability to drive R&D projects from concept to hardware deployment. Actively seeking opportunities
        to advance cutting-edge research, with a keen interest in learning new frontiers, tackling complex problems, and
        adapting to new technologies, with the ability to work both independently and in a team.
        </Typography>
      </Container>

      {/* Projects Section */}
      <Container id="projects" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Recent Projects
        </Typography>
        <Grid container spacing={4}>
          {loadingProjects
            ? Array.from(new Array(3)).map((_, index) => (
                <Grid key={index} size={{ xs: 12, md: 4 }}>
                  <ProjectCardSkeleton />
                </Grid>
              ))
            : recentProjects.map((project, idx) => (
                <Grid key={idx} size={{ xs: 12, md: 4 }}>
                  <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image} // Example: "/images/ecommerce.png" or external URL
                      alt={project.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                        {/* {project.createdAt.toString() ?? "No Date available."} */}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleViewDetails(project._id ?? '')}>
                        View Details →
                      </Button>
                      {project.liveLink && (
                        <Button
                          size="small"
                          component="a"
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live Demo
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          size="small"
                          component="a"
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Source Code
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" onClick={() => handleViewAllDetails()}>
            View All Projects →
          </Button>
        </Box>
      </Container>

      {/* Contact Section */}
      <Container id="contact" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Me
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          I am always open to new opportunities and interesting projects. Feel free to reach out!
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Link href="mailto:pankajan.t.s@gmail.com" underline="hover" variant="h6" color="primary">
            pankajan.t.s@gmail.com
          </Link>
        </Box>
      </Container>

      {/* Footer */}
      <Paper
        component="footer"
        square
        sx={(theme) => ({
          mt: 8,
          p: 3,
          textAlign: 'center',
          bgcolor: theme.palette.background.paper, // use theme
          color: theme.palette.text.primary, // optional, for text
        })}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} pankajan. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
          <IconButton component="a" href="https://github.com/pankajan-T" target="_blank">
            <GitHubIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://lk.linkedin.com/in/pankajan-thurairatnam?trk=public_profile_browsemap"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton component="a" href="mailto:pankajan.t.s@gmail.com">
            <EmailIcon />
          </IconButton>
        </Box>
      </Paper>

      <LoadingBackdrop open={loading} />
    </Box>
  );
}
