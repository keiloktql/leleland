import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

const ProjectCard = ({ img, likes = "error", name = "error", link }) => {

  const navigate = useNavigate();

  return (
    <div className="c-Project-card" onClick={() => navigate(link)}>
      <div className="c-Project-card__Img">
        {
          img ?
            <img src={require(`../assets/images/${img}`)} alt="Img" /> :
            <p>Nothing to display.</p>
        }
      </div>
      <div className="c-Project-card__Info">
        <div className="c-Project-card__Likes">
          <IconContext.Provider className="c-Project-card__Icon" value={{ color: "#E20000", size: "16px" }}>
            <AiIcons.AiFillHeart />
          </IconContext.Provider>
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