import React from "react";
import styles from "./AboutModal.module.scss";
import { X, Linkedin, Mail } from "lucide-react";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import ReactDOM from "react-dom";

const AboutModal = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <h2>About Tasktivate</h2>
        <p>A MERN stack application for managing tasks, built as a fun project.</p>

        <p>
          Check out the{" "}
          <a href="https://github.com/idmcalculus/task-manager-api" target="_blank" rel="noopener noreferrer">
            Backend <SiGithub size={14} />
          </a>
          {"  and  "}
          <a href="https://github.com/idmcalculus/tasktivate" target="_blank" rel="noopener noreferrer">
            Frontend <SiGithub size={14} />
          </a> {"  repositories."}
        </p>
        <div className={styles.socialIcons}>
          <a href="https://github.com/idmcalculus" target="_blank" rel="noopener noreferrer">
            <SiGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/idmcalculus" target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} />
          </a>
          <a href="https://x.com/calculus_codes" target="_blank" rel="noopener noreferrer">
            <SiX size={20} />
          </a>
		  <a href="mailto:idm.calculus@gmail.com">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>,
   document.body
  );
};

export default AboutModal;