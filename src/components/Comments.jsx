import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../utils/firebase';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ENUMS from '../config/enums';
import { firebaseFn } from '../utils/firebase';
import TextField from '../components/TextField';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import { toast } from 'react-toastify';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

const Comments = ({ commentsList, postID, loadingComments }) => {

    const [currentUser, loading] = useAuth();
    const [submitStatus, setSubmitStatus] = useState(ENUMS.submitStatus.IDLE);
    const [timerVal, setTimeVal] = useState(0);

    dayjs.extend(relativeTime);

    const validate = Yup.object({
        comment: Yup.string()
            .required('Input cannot be empty!'),
    });

    useEffect(() => {
        const timerEndMS = localStorage.getItem("c_sz");
        const delta = timerEndMS - Date.now(); // milliseconds elapsed since start
        const timeLeft = Math.floor(delta / 1000); // in seconds

        if (timeLeft > 0) {
            const timer = setInterval(() => {
                const timerEndMS = localStorage.getItem("c_sz");
                const delta = timerEndMS - Date.now(); // milliseconds elapsed since start
                const timeLeft = Math.floor(delta / 1000); // in seconds
                if (timeLeft <= 0) {
                    clearInterval(timer);
                }
                setTimeVal(() => timeLeft);
            }, 1000);
        }

    }, [submitStatus]);

    // Handlers
    const handleSubmitComment = async (values, { resetForm }) => {
        setSubmitStatus(() => ENUMS.submitStatus.LOADING);

        const [postSuccess, postError] = await firebaseFn.postComment(postID, values.comment);
        if (postSuccess) {
            resetForm();
            localStorage.setItem("c_sz", Date.now() + 20000);
        } else {
            toast.error(postError);
        }

        setSubmitStatus(() => ENUMS.submitStatus.ERROR);
    };

    const handleDeleteComment = async (commentID, userID) => {

        if (currentUser.uid !== userID) {
            toast.error("You are not permitted to delete this comment!");
            return;
        }

        const [deleteSuccess, deleteError] = await firebaseFn.deleteComment(postID, commentID);

        if (deleteSuccess) {
            toast.success("Comment has been successfully deleted!");
        } else {
            toast.error(deleteError);
        }
    };

    return (
        <div className="c-Comments">
            <div className="c-Comments__Top">
                <h1>Comments</h1>
                <div className="c-Comments__Post">
                    <div className="c-Comments__Avatar">
                        {
                            currentUser?.photoURL ?
                                <img src={currentUser.photoURL} alt="Avatar" /> :
                                <span></span>
                        }
                    </div>

                    <Formik
                        initialValues={{
                            comment: ''
                        }}
                        validationSchema={validate}
                        onSubmit={handleSubmitComment}
                    >
                        {
                            ({ isValid, dirty }) => (
                                <Form className="c-Comments__Input c-Input">
                                    <Field disabled={timerVal > 0 || !currentUser || submitStatus === ENUMS.submitStatus.LOADING} label="Comment" placeholder={currentUser ? timerVal > 0 ? "Cooldown..." : "What are your thoughts" : "Sign in to comment"} name="comment" as={TextField} />
                                    <div className="c-Input__Bottom">
                                        <button disabled={timerVal > 0 || !isValid || !dirty || !currentUser || submitStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Primary">
                                            {
                                                timerVal > 0 ?
                                                    timerVal :
                                                    submitStatus === ENUMS.submitStatus.LOADING ?
                                                        <LoadingSpinner
                                                            variant="light" />
                                                        :
                                                        "Post"
                                            }
                                        </button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
            <div className="c-Comments__List">
                {
                    commentsList.length > 0 ?
                        <>
                            {
                                commentsList.map((oneComment, index) =>
                                    <div key={index}>
                                        <CommentsItem
                                            data={oneComment}
                                            handleDeleteComment={handleDeleteComment}
                                            currentUser={currentUser}
                                        />
                                        <hr />
                                    </div>
                                )
                            }
                        </>
                        :
                        <div className="c-Comments__Empty c-Empty">
                            <figure className="c-Empty__Figure c-Figure">
                                <div className="c-Figure__Textbox l-Textbox">
                                    <div className="c-Textbox c-Textbox--Top">
                                        <span className="c-Fake-avatar"></span>
                                        <div className="c-Fake-comments">
                                            <span className="c-Fake-comments__Top"></span>
                                            <span className="c-Fake-comments__Bottom"></span>
                                        </div>
                                    </div>
                                    <div className="c-Textbox c-Textbox--Bottom">
                                        <span className="c-Fake-avatar"></span>
                                        <div className="c-Fake-comments">
                                            <span className="c-Fake-comments__Top"></span>
                                            <span className="c-Fake-comments__Bottom"></span>
                                        </div>
                                    </div>
                                </div>
                                <h1>No comments yet</h1>
                            </figure>
                        </div>
                }
            </div>

        </div>
    )
};

const CommentsItem = ({ data, handleDeleteComment, currentUser }) => {
    return (
        <div className="c-Comments-item">
            <div className="c-Comments-item__Top c-Top">
                <div className="c-Top__Left">
                    <div className="c-Top__Avatar">
                        <img src={data.photoURL} alt="Avatar" />
                    </div>
                    <div className="c-Top__Meta c-Meta">
                        <div className="c-Meta__Name">
                            <h1>{data.sender}</h1>
                            {
                                data.verified ?
                                    <Tooltip title="Verified account" arrow placement='right' >
                                        <Icon className="c-Meta__Verified" icon="ic:baseline-verified" />
                                    </Tooltip> :
                                    null
                            }
                        </div>
                        <p>{dayjs(new Date(data.createdAt)).fromNow()}</p>
                    </div>
                </div>

                <div className="c-Top__Right">
                    {
                        currentUser?.uid === data.userID ?
                            <Icon className="c-Top__Bin" icon="icomoon-free:bin" onClick={() => handleDeleteComment(data.commentID, data.userID)} /> :
                            null

                    }
                </div>
            </div>
            <div className="c-Comments-item__Content">
                <p>{data.comment}</p>
            </div>
        </div>
    );
};

export default Comments;

