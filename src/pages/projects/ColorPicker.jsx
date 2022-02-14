import React, { createRef, useState, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import { NavLink } from 'react-router-dom';
import Enums from '../../config/enums';
import SubHeader from '../../layout/SubHeader';
import { Icon } from '@iconify/react';
import { firebaseFn, useTrackLikes, useTrackComments, useAuth } from '../../utils/firebase';
import ENUMS from '../../config/enums';
import { toast } from 'react-toastify';
import Comments from '../../components/Comments';
import Skeleton from '@mui/material/Skeleton';
import _ from 'lodash';
import { projectList } from '../../data/projects';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

const ColorPicker = () => {
  
    dayjs.extend(relativeTime);
    const postID = projectList[0].id;
    const project = projectList[0];
    const commentsRef = createRef();
    const [currentUser, loadingPage] = useAuth();
    const [likesArr, loadingLikes, likes, liked] = useTrackLikes(postID, currentUser);
    const [commentsArr, loadingComments] = useTrackComments(postID, currentUser);

    const subLinkArr = [
        {
            name: "Demo",
            ref: createRef("")
        },
        {
            name: "Story",
            ref: createRef("")
        }
    ];

    // Handlers
    const handleLikeOrUnlikePost = _.debounce(async (event, boolLike) => {

            if (currentUser === null) {
                toast.error("Error! Please login to like this project");
                return;
            }
            const [resSuccess, resError] = await firebaseFn.likeOrUnlikePost(postID, boolLike);
    
            if (resSuccess) {
 
            } else {
                toast.error(resError);
            }
    }, 300);

    const handleScroll = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    };

    return (
        <MainLayout title="Color Picker • LeLeLand" headerFixed={false} headerTheme={Enums.headerTheme.DARK}>
            <SubHeader
                name="Color Picker"
                subLinkArr={subLinkArr}
            />
            <div className="c-Color-picker">

                {/* Meta info */}
                <div className="c-Color-picker__Meta l-Meta">
                    <div className="c-Meta">
                        <p className="c-Meta__Dates">Last Updated {dayjs(new Date(project.last_updated_date)).fromNow()}</p>
                        <div className="c-Meta__Logo c-Logo">
                            {
                                !loadingLikes ?
                                    liked ?
                                        <div className="c-Logo__Icon" onClick={(event) => handleLikeOrUnlikePost(event, false)}>
                                            <p className="c-Logo__Val">{likes}</p>
                                            <Icon className="c-Icon c-Icon--heart-liked" icon="emojione:smiling-face-with-heart-eyes" />
                                        </div> :
                                        <div className="c-Logo__Icon" onClick={(event) => handleLikeOrUnlikePost(event, true)}>
                                            <p className="c-Logo__Val">{likes}</p>
                                            <Icon className="c-Icon c-Icon--heart-unliked" icon="bi:emoji-heart-eyes-fill" />
                                        </div> :
                                    <div className="c-Logo__Icon">
                                        <Skeleton variant="text" width={20} />
                                    </div>
                            }
                            {
                                !loadingComments ?
                                    <div className="c-Logo__Icon" onClick={() => handleScroll(commentsRef)}>
                                        <p className="c-Logo__Val">{commentsArr.length}</p>
                                        <Icon className="c-Icon c-Icon--chat" icon="bi:chat-right" />
                                    </div> :
                                    <div className="c-Logo__Icon">
                                        <Skeleton variant="text" width={20} />
                                    </div>
                            }

                        </div>
                    </div>

                </div>

                {/* Demo */}
                <div ref={subLinkArr[0].ref} className="c-Color-picker__Demo">
                    <div className="c-Demo">

                    </div>

                </div>

                {/* Story */}
                <div ref={subLinkArr[1].ref} className="c-Color-picker__Story">
                    <div className="c-Story">

                    </div>
                </div>

                {/* Comments */}
                <div ref={commentsRef} className="c-Color-picker__Comments l-Comments">
                    <Comments
                        commentsList={commentsArr}
                        postID={postID}
                        loadingComments={loadingComments}
                    />
                </div>
            </div>
        </MainLayout>
    );
};

export default ColorPicker;