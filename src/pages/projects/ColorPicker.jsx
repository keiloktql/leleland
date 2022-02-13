import React, { createRef, useState, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import { NavLink } from 'react-router-dom';
import Enums from '../../config/enums';
import SubHeader from '../../layout/SubHeader';
import { Icon } from '@iconify/react';
import { firebaseFn, useTrackLikes, useAuth, postIDObj } from '../../utils/firebase';
import ENUMS from '../../config/enums';
import { toast } from 'react-toastify';

const ColorPicker = () => {
    const [rerender, setRerender] = useState(false);
    const postID = postIDObj.colorPicker;

    const [currentUser, loadingPage] = useAuth();
    const [likesArr, loadingLikes, likes, liked] = useTrackLikes(postID, currentUser);

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
    const handleLikeOrUnlikePost = async (event, boolLike) => {
        if (currentUser === null) {
            toast.error("Error! Please login to like this project");
            return;
        }
        const [resSuccess, resError] = await firebaseFn.likeOrUnlikePost(postID, boolLike);

        if (resSuccess) {
            setRerender((prevState) => !prevState);
        } else {
            toast.error(resError);
        }

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
                        <p className="c-Meta__Dates">Published on: 25th July 2022 | Last Updated on: 25th July 2022</p>
                        <div className="c-Meta__Logo c-Logo">
                            {
                                liked ?
                                    <div className="c-Logo__Icon" onClick={(event) => handleLikeOrUnlikePost(event, false)}>
                                        <p className="c-Logo__Val">{likes}</p>
                                        <Icon className="c-Icon c-Icon--heart-liked" icon="emojione:smiling-face-with-heart-eyes" />
                                    </div> :
                                    <div className="c-Logo__Icon" onClick={(event) => handleLikeOrUnlikePost(event, true)}>
                                        <p className="c-Logo__Val">{likes}</p>
                                        <Icon className="c-Icon c-Icon--heart-unliked" icon="bi:emoji-heart-eyes-fill" />
                                    </div>
                            }


                            <div className="c-Logo__Icon">
                                <p className="c-Logo__Val">7</p>
                                <Icon className="c-Icon c-Icon--chat" icon="bi:chat-right" />
                            </div>
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
            </div>
        </MainLayout>
    );
};

export default ColorPicker;