/* import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Search, Bell, FileText, Wifi } from 'lucide-react';
import styles from "../../styles/Home.module.scss";

const Home = () => {
  const features = [
    {
      icon: <CheckCircle2 className={`${styles.icon}`} />,
      title: "Easy Task Management",
      description: "Create and manage tasks with an intuitive interface",
      bgImage: "https://images.unsplash.com/photo-1559149176-7e55f5558fbd?auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Users className={`${styles.icon}`} />,
      title: "Team Collaboration",
      description: "Assign tasks to team members and track their progress",
      bgImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Search className={`${styles.icon}`} />,
      title: "Smart Filtering",
      description: "Filter tasks based on status, priority, or other criteria",
      bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Bell className={`${styles.icon}`} />,
      title: "Instant Notifications",
      description: "Receive email notifications on task updates",
      bgImage: "https://images.unsplash.com/photo-1461958508236-9a742665a0d5?auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <FileText className={`${styles.icon}`} />,
      title: "File Attachments",
      description: "Attach files to tasks for better context",
      bgImage: "https://images.unsplash.com/photo-1574680279533-341a9c79f0af?auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Wifi className={`${styles.icon}`} />,
      title: "Real-time Updates",
      description: "Enjoy real-time updates using WebSockets",
      bgImage: "https://images.unsplash.com/photo-1489506020498-e6b7ae721f49?auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.fadeIn}>Welcome to Tasktivate!</h1>
          <p className={`${styles.description} ${styles.slideUp}`}>
            Your one-stop solution for managing tasks efficiently and effectively.
          </p>
        </div>

        <div className={styles.cta}>
          <Link to="/register">
            <button className={`${styles.button} ${styles.bounceSubtle}`}>
              Get Started
            </button>
          </Link>
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureOuter}>
              <div
                className={`${styles.feature} ${styles.fadeIn}`}
                style={{ backgroundImage: `url(${feature.bgImage})` }}
              >
                <div className={styles.overlay}>
                  {feature.icon}
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; */

// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Search, Bell, FileText, Wifi } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../styles/Home.module.scss";

const Home = () => {
  const features = [
    {
      icon: <CheckCircle2 className={`${styles.icon}`} />,
      title: "Easy Task Management",
      description: "Create and manage tasks with an intuitive interface",
      bgImage: "https://via.placeholder.com/800x600?text=Task+Management" // Placeholder image
    },
    {
      icon: <Users className={`${styles.icon}`} />,
      title: "Team Collaboration",
      description: "Assign tasks to team members and track their progress",
      bgImage: "https://via.placeholder.com/800x600?text=Team+Collaboration" // Placeholder image
    },
    {
      icon: <Search className={`${styles.icon}`} />,
      title: "Smart Filtering",
      description: "Filter tasks based on status, priority, or other criteria",
      bgImage: "https://via.placeholder.com/800x600?text=Smart+Filtering" // Placeholder image
    },
    {
      icon: <Bell className={`${styles.icon}`} />,
      title: "Instant Notifications",
      description: "Receive email notifications on task updates",
      bgImage: "https://via.placeholder.com/800x600?text=Notifications" // Placeholder image
    },
    {
      icon: <FileText className={`${styles.icon}`} />,
      title: "File Attachments",
      description: "Attach files to tasks for better context",
      bgImage: "https://via.placeholder.com/800x600?text=File+Attachments" // Placeholder image
    },
    {
      icon: <Wifi className={`${styles.icon}`} />,
      title: "Real-time Updates",
      description: "Enjoy real-time updates using WebSockets",
      bgImage: "https://via.placeholder.com/800x600?text=Real+Time+Updates" // Placeholder image
    }
  ];

  const testimonials = [
    {
      quote: "Tasktivate has transformed how our team manages projects.",
      author: "Jane Doe, Project Manager at XYZ Corp",
    },
    {
      quote: "The real-time updates feature is a game-changer!",
      author: "John Smith, Developer at ABC Inc",
    },
    {
      quote: "I love how intuitive and user-friendly Tasktivate is.",
      author: "Emily Johnson, Freelancer",
    },
    {
      quote: "Tasktivate helps me stay organized and on top of deadlines.",
      author: "Michael Brown, Marketing Specialist",
    },
    {
      quote: "Highly recommend Tasktivate for teams of all sizes!",
      author: "Sarah Lee, Team Lead at Tech Solutions",
    },
  ];

  // Slick Carousel settings
  const settings = {
    dots: true,
    dotsClass: "slick-dots custom-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.fadeIn}>Welcome to Tasktivate!</h1>
          <p className={`${styles.description} ${styles.slideUp}`}>
            Your one-stop solution for managing tasks efficiently and effectively.
          </p>
        </div>
        {/* Call-to-Action Section */}
        <div className={styles.cta}>
          <Link to="/register">
            <button className={`${styles.button} ${styles.bounceSubtle}`}>
              Get Started
            </button>
          </Link>
        </div>
        {/* Features Section */}
        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureOuter}>
              <div
                className={`${styles.feature} ${styles.fadeIn}`}
                style={{ backgroundImage: `url(${feature.bgImage})` }}
              >
                <div className={styles.overlay}>
                  {feature.icon}
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Testimonials Section */}
        <div className={styles.testimonials}>
          <h2>What Our Users Say</h2>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <p>{testimonial.quote}</p>
                <span>{testimonial.author}</span>
              </div>
            ))}
          </Slider>
        </div>
        {/* Task Dashboard Preview */}
        <div className={styles.dashboardPreview}>
          <h2>Task Dashboard Preview</h2>
          <div className={styles.dashboard}>
            {/* Placeholder Image for Task Dashboard */}
            <img
              src="https://via.placeholder.com/1200x600?text=Task+Dashboard+Preview"
              alt="Task Dashboard Preview"
              className={styles.dashboardImage}
            />
          </div>
        </div>
      </div>
      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="/about-us">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
        <div className={styles.socialIcons}>
          <a href="https://linkedin.com"><i className="fab fa-linkedin"></i></a>
          <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
          <a href="https://facebook.com"><i className="fab fa-facebook"></i></a>
          <a href="https://instagram.com"><i className="fab fa-instagram"></i></a>
        </div>
        <p>&copy; 2023 Tasktivate. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;