import React from "react";

export const SpoilerProtection = ({ isSpoilerVisible, text }) => {
    return (
        <div className={`spoiler-content ${isSpoilerVisible ? "visible" : ""}`}>
            {!isSpoilerVisible ? (
                <div className="protection-wrapper">
                    <p>Este comentário contém spoiler.</p>
                </div>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: text }} />
            )}
        </div>
    );
};
