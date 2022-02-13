import React, { useState } from 'react';
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

const Comments = ({ commentsList, postID }) => {
    console.log(commentsList);

    const [currentUser, loading] = useAuth();
    const [submitStatus, setSubmitStatus] = useState(ENUMS.submitStatus.IDLE);

    const validate = Yup.object({
        comment: Yup.string()
            .required('Input cannot be empty!'),
    });


    const handleSubmitComment = async (values, { resetForm }) => {
        setSubmitStatus(() => ENUMS.submitStatus.LOADING);

        const [postSuccess, postError] = await firebaseFn.postComment(postID, values.comment);
        if (postSuccess) {
            toast.success("Comment successs!");
            resetForm();
        } else {
            toast.error(postError);
        }

        setSubmitStatus(() => ENUMS.submitStatus.ERROR);
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
                                    <Field disabled={!currentUser || submitStatus === ENUMS.submitStatus.LOADING} label="Comment" placeholder={currentUser ? "What are your thoughts" : "Sign in to comment"} name="comment" as={TextField} />
                                    <div className="c-Input__Bottom">
                                        <button disabled={!isValid || !dirty || !currentUser || submitStatus === ENUMS.submitStatus.LOADING} type="submit" className="c-Btn c-Btn__Primary">
                                            {
                                                submitStatus === ENUMS.submitStatus.LOADING ?
                                                    <LoadingSpinner
                                                        variant="light" />
                                                    :
                                                    "Comment"
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
                {/* <CommentsItem />
                <hr />
                <CommentsItem />
                <hr /> */}
                {/* {
                    commentsList.length > 0 ?
                        <CommentsItem /> :
                        "No comments"
                } */}
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
            </div>

        </div>
    )
};

const CommentsItem = () => {
    return (
        <div className="c-Comments-item">
            <div className="c-Comments-item__Top c-Top">
                <div className="c-Top__Left">
                    <div className="c-Top__Avatar">
                        <img src={"https://avatars.dicebear.com/api/adventurer-neutral/d8d331e2-fe90-4c6a-b3da-653144b8dc46.svg"} alt="Avatar" />
                    </div>
                    <div className="c-Top__Meta c-Meta">
                        <div className="c-Meta__Name">
                            <h1>Glenn Ng</h1>
                            <Tooltip title="Verified account" arrow placement='right' >
                                <Icon className="c-Meta__Verified" icon="ic:baseline-verified" />
                            </Tooltip>
                        </div>
                        <p>A few seconds ago</p>
                    </div>
                </div>

                <div className="c-Top__Right">
                    <Icon className="c-Top__Bin" icon="icomoon-free:bin" />
                </div>
            </div>
            <div className="c-Comments-item__Content">
                <p>I think this is a pretty cool project =)</p>
            </div>
        </div>
    );
};

export default Comments;

