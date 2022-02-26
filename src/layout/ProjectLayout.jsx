import React, { createRef } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Skeleton from '@mui/material/Skeleton';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';

import { firebaseFn, useTrackLikes, useTrackComments, useAuth } from '../utils/firebase';

import Header from './Header';
import Footer from './Footer';
import Title from './Title';
import SubHeader from './SubHeader';

import ENUMS from '../config/enums';
import Comments from '../components/Comments';


const ProjectLayout = ({ children, title, subTitle, subLinkArr, projectID, project }) => {
    dayjs.extend(relativeTime);

    const commentsRef = createRef();
    const [currentUser, loadingPage] = useAuth();
    const [likesArr, loadingLikes, likes, liked] = useTrackLikes(projectID, currentUser);
    const [commentsArr, loadingComments] = useTrackComments(projectID, currentUser);

    // Handlers
    const handleLikeOrUnlikePost = _.debounce(async (event, boolLike) => {

        if (currentUser === null) {
            toast.error("Error! Please login to like this project");
            return;
        }
        const [resSuccess, resError] = await firebaseFn.likeOrUnlikePost(projectID, boolLike);

        if (resSuccess) {

        } else {
            toast.error(resError);
        }
    }, 300);

    const handleScroll = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' })
    };

    return (
        <>
            <Header theme={ENUMS.headerTheme.DARK} fixed={false} />
            <Title title={title} />
            <SubHeader
                name={subTitle}
                subLinkArr={subLinkArr}
            />
            <main className={`c-Project-layout`}>
                
                {/* Meta info */}
                <div className="c-Project-layout__Meta l-Meta">
                    <div className="c-Meta">
                        <p className="c-Meta__Dates">Last updated {dayjs(new Date(project.last_updated_date)).fromNow()}</p>
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

                {children}

                {/* Comments */}
                <div ref={commentsRef} className="c-Project-layout__Comments l-Comments">
                    <Comments
                        commentsList={commentsArr}
                        postID={projectID}
                        loadingComments={loadingComments}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProjectLayout;