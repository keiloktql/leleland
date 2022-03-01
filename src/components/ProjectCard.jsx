import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Icon } from '@iconify/react';

const ProjectCard = ({ img, likes = 0, views = 0, name = "error", link, last_updated_date }) => {

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
        <div className="c-Project-card__Emojis">
          <div className = "c-Project-card__Views">
          <Icon className="c-Project-card__Icon" icon="bi:eye-fill" />
            <p>{views}</p>
          </div>
          <div className="c-Project-card__Likes">
            <Icon className="c-Project-card__Icon" icon="emojione:smiling-face-with-heart-eyes" />
            <p>{likes}</p>
          </div>
        </div>

        <div className="c-Project-card__Name">
          <p>{name}</p>
        </div>
        <div className="c-Project-card__Date">
          <p>{last_updated_date}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;