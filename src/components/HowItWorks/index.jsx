import React from "react";
import { motion } from "framer-motion";
import "./HowItWorks.css";

const HowItWorks = () => {
    const steps = [
        {
            title: "Select Location",
            description: "Choose your preferred study location from our list of available spaces.",
            icon: "🎯"
        },
        {
            title: "Check Availability",
            description: "View real-time availability of your chosen location.",
            icon: "⏰"
        },
        {
            title: "Book Space",
            description: "Reserve your spot instantly and get confirmation.",
            icon: "✅"
        }
    ];

    return (
        <motion.div 
            className="how-it-works"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                How StudyHub Works
            </motion.h1>
            <motion.div 
                className="steps-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="step-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + (index * 0.2) }}
                        whileHover={{ 
                            scale: 1.03,
                            boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
                        }}
                    >
                        <motion.div 
                            className="step-icon"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.6 + (index * 0.2) }}
                        >
                            {step.icon}
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.7 + (index * 0.2) }}
                        >
                            {step.title}
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.8 + (index * 0.2) }}
                        >
                            {step.description}
                        </motion.p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default HowItWorks;
