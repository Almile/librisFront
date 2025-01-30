import React from "react";
import styles from "../styles/comments.module.css";

export const SpoilerProtection = ({ isSpoilerVisible, text }) => {
    return (
        <div className={`spoilerContent ${isSpoilerVisible ? "visible" : ""}`}>
            {!isSpoilerVisible ? (
                <div className={styles.protectionWrapper}>
                    <p>Este comentário contém spoiler.</p>
                </div>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: text }} />
            )}
        </div>
    );
};
