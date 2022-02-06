import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ img, likes = "error", name = "error", link }) => {

  const navigate = useNavigate();

  return (
    <div className="c-Project-card" onClick={() => navigate(link)}>
      <div className="c-Project-card__Img">
        {
          img ?
            <img src={img} alt="Img" /> :
            <p>Nothing to display.</p>
        }
      </div>
      <div className="c-Project-card__Info">
        <div className="c-Project-card__Likes">
          <p>10 likes</p>
        </div>
        <div className="c-Project-card__Name">
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;