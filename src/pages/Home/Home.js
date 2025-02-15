import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Search, Bell, FileText, Wifi } from 'lucide-react';
import styles from "../../styles/Home.module.scss";

const Home = () => {
  const features = [
    {
      icon: <CheckCircle2 className={`${styles.icon}`} />,
      title: "Easy Task Management",
      description: "Create and manage tasks with an intuitive interface"
    },
    {
      icon: <Users className={`${styles.icon}`} />,
      title: "Team Collaboration",
      description: "Assign tasks to team members and track their progress"
    },
    {
      icon: <Search className={`${styles.icon}`} />,
      title: "Smart Filtering",
      description: "Filter tasks based on status, priority, or other criteria"
    },
    {
      icon: <Bell className={`${styles.icon}`} />,
      title: "Instant Notifications",
      description: "Receive email notifications on task updates"
    },
    {
      icon: <FileText className={`${styles.icon}`} />,
      title: "File Attachments",
      description: "Attach files to tasks for better context"
    },
    {
      icon: <Wifi className={`${styles.icon}`} />,
      title: "Real-time Updates",
      description: "Enjoy real-time updates using WebSockets"
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
            <div key={index} className={`${styles.feature} ${styles.fadeIn}`}>
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;