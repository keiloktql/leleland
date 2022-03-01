import React, { createRef, useEffect, useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
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
import RequireAccountModal from '../components/RequireAccountModal';
import useComponentVisible from '../hooks/useComponentVisible';


const ProjectLayout = ({ children, title, subTitle, subLinkArr, projectID, project }) => {
    dayjs.extend(relativeTime);

    const commentsRef = createRef();
    const [currentUser, loadingPage] = useAuth();
    const [likesArr, loadingLikes, likes, liked] = useTrackLikes(projectID, currentUser);
    const [commentsArr, loadingComments] = useTrackComments(projectID, currentUser);
    const [showRequireAccountModal, setShowRequireAccountModal] = useState(false);
    const [loadingView, setLoadingView] = useState(true);
    const [views, setViews] = useState(0);

    const { ref } = useComponentVisible(showRequireAccountModal, setShowRequireAccountModal);

    // Handlers
    const handleLikeOrUnlikePost = _.debounce(async (event, boolLike) => {

        if (currentUser === null) {
            setShowRequireAccountModal(() => true);
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

    const addView = async () => {
        try {
            await firebaseFn.postView(projectID);
        } catch (error) {
        }
    };

    useEffect(() => {

        setTimeout(async () => {
            await addView();
        }, 5000);

        (async () => {
            try {
                const view = await firebaseFn.getView(projectID);
                setViews(() => view);
            } catch (error) {
                console.log(error);
            }
            setLoadingView(() => false);
        })();

    }, []);

    return (
        <>
            <Header theme={ENUMS.headerTheme.DARK} fixed={false} />
            <Title title={title} />
            <SubHeader
                name={subTitle}
                subLinkArr={subLinkArr}
            />
            <RequireAccountModal
                show={showRequireAccountModal}
                setShow={setShowRequireAccountModal}
            />
            <main className={`c-Project-layout`} ref={ref}>

                {/* Meta info */}
                <div className="c-Project-layout__Meta l-Meta">
                    <div className="c-Meta">
                        <p className="c-Meta__Dates">Last updated {dayjs(new Date(project.last_updated_date)).fromNow()}</p>
                        <div className="c-Meta__Logo c-Logo">
                            {
                                !loadingView ?
                                    <Tooltip title="Views" arrow placement='bottom' >
                                        <div className="c-Logo__Icon">
                                            <p className="c-Logo__Val">{views}</p>
                                            <Icon className="c-Icon c-Icon--view" icon="bi:eye-fill" />
                                        </div>
                                    </Tooltip>
                                    :
                                    <div className="c-Logo__Icon">
                                        <Skeleton variant="text" width={20} />
                                    </div>
                            }

                            {
                                !loadingLikes ?
                                    liked ?
                                        <Tooltip title="Likes" arrow placement='bottom' >
                                            <div className="c-Logo__Icon" onClick={(event) => handleLikeOrUnlikePost(event, false)}>
                                                <p className="c-Logo__Val">{likes}</p>
                                                <Icon className="c-Icon c-Icon--heart-liked" icon="emojione:smiling-face-with-heart-eyes" />
                                            </div>
                                        </Tooltip>
                                        :
                                        <Tooltip title="Click to like!" arrow placement='bottom' >
                                            <div className="c-Logo__Icon" onClick={(event) => handleLikeOrUnlikePost(event, true)}>
                                                <p className="c-Logo__Val">{likes}</p>
                                                <Icon className="c-Icon c-Icon--heart-unliked" icon="bi:emoji-heart-eyes-fill" />
                                            </div>
                                        </Tooltip>
                                    :
                                    <div className="c-Logo__Icon">
                                        <Skeleton variant="text" width={20} />
                                    </div>
                            }
                            {
                                !loadingComments ?
                                    <Tooltip title="Go to comments" arrow placement='bottom' >
                                        <div className="c-Logo__Icon" onClick={() => handleScroll(commentsRef)}>
                                            <p className="c-Logo__Val">{commentsArr.length}</p>
                                            <Icon className="c-Icon c-Icon--chat" icon="bi:chat-right" />
                                        </div>
                                    </Tooltip>
                                    :
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
                        projectID={projectID}
                        loadingComments={loadingComments}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProjectLayout;