import React from "react";
import { CommentList } from "./CommentList";

const ProfilePage = ({ allComments = [], currentUser}) => {
    // Filtra os comentários feitos pelo usuário logado
    const userComments = allComments.filter(
        (comment) => comment.user.id === currentUser.id
    );

    return (
        <div className="profile-page">
            <h1>Comentários de {currentUser}</h1>
            {userComments.length > 0 ? (
                <CommentList
                    comments={userComments}
                />
            ) : (
                <p>Você ainda não fez nenhum comentário.</p>
            )}
        </div>
    );
};

export default ProfilePage;
