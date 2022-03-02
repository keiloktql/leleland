import React, { useState, useEffect } from 'react';
import MainLayout from '../layout/MainLayout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ProjectCard from '../components/ProjectCard';
import ENUMS from '../config/enums';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ProjectCardSkeleton from '../components/loading/ProjectCardSkeleton';
import { firebaseFn } from '../utils/firebase';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { projectList } from '../data/projects';

const Gallery = () => {

    dayjs.extend(relativeTime);

    // States
    const [projects, setProjects] = useState([]);
    const [searchProjects, setSearchProjects] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchedValue, setSearchedValue] = useState("");
    const [pageStatus, setPageStatus] = useState(ENUMS.pageStatus.LOADING);

    // useEffect
    useEffect(() => {
        let componentMounted = true;
        (async () => {
            try {
                if (componentMounted) {


                    const [resSuccess, resObj] = await firebaseFn.getLikes();
                    const [viewsSuccess, viewsObj] = await firebaseFn.getViews();

                    let formattedProjects = [];

                    if (resSuccess) {
                        formattedProjects = projectList.map((oneProject) => {
                            let newProject = {
                                ...oneProject,
                                last_updated_date: dayjs(new Date(oneProject.last_updated_date)).fromNow()
                            };

                            // Set likes
                            resObj.every((oneLikeObj) => {
                                if (oneLikeObj.name === oneProject.id) {
                                    newProject = {
                                        ...newProject,
                                        likes: (() => {
                                            let likes = 0;
                                            Object.keys(oneLikeObj).forEach((key) => {
                                                if (key !== "name") {
                                                    if (oneLikeObj[key]) {
                                                        likes++;
                                                    }
                                                }
                                            })
                                            return likes;
                                        })()
                                    }
                                    return false;
                                }
                                return true;
                            });

                            if (viewsSuccess) {
                                // Set views
                                viewsObj.every((oneViewObj) => {
                                    if (oneViewObj.name === oneProject.id) {
                                        newProject = {
                                            ...newProject,
                                            views: oneViewObj.counter
                                        }
                                        return false;
                                    }
                                    return true;
                                });
                            }

                            return newProject;
                        });
                    }

                    setProjects(() => formattedProjects);
                    setSearchProjects(() => formattedProjects);
                    setPageStatus(() => ENUMS.pageStatus.IDLE);

                }
            } catch (error) {
                console.log(error);
                setPageStatus(() => ENUMS.pageStatus.ERROR);
            }


        })();
        return (() => {
            componentMounted = false;
        });
    }, []);

    useEffect(() => {
        let componentMounted = true;
        (async () => {
            try {
                if (componentMounted) {
                    if (projects.length < 1) {
                        return;
                    }

                    let currentSearchValue = "";

                    if (searchedValue !== "") {
                        currentSearchValue = searchedValue.toLowerCase();
                    }

                    let matchSearchArr = [];

                    projects.forEach((project) => {
                        let projectNameLowercase = project.name.toLowerCase();
                        let matchSearch = projectNameLowercase.includes(currentSearchValue.toLowerCase());
                        if (matchSearch) {
                            matchSearchArr.push(project);
                        }
                    });

                    setSearchProjects(() => matchSearchArr);
                }
            } catch (error) {
                console.log(error);
            }
        })();
        return (() => {
            componentMounted = false;
        });


    }, [searchedValue]);

    return (
        <MainLayout title="Gallery • LeLeLand">
            <div className="c-Gallery">
                <div className="c-Gallery__Top">
                    <div className="c-Gallery__Heading">
                        <h1>Search LeLeLand</h1>
                        <p>Discover awesome projects =)</p>
                    </div>
                </div>

                {/* Search */}
                <div className="c-Gallery__Search">
                    <div className="c-Gallery__Search-wrapper">
                        <SearchBar
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            searchedValue={searchedValue}
                            setSearchedValue={setSearchedValue}
                            data={projects}
                        />
                    </div>
                </div>
                {/* Projects */}
                <div className="c-Gallery__Projects">
                    <div className="c-Projects">
                        {
                            pageStatus === ENUMS.pageStatus.LOADING ?
                                <>
                                    <ProjectCardSkeleton />
                                    <ProjectCardSkeleton />
                                    <ProjectCardSkeleton />
                                </>
                                :
                                searchProjects.length > 0 ?
                                    searchProjects.map((project, index) => (
                                        <ProjectCard
                                            key={index}
                                            img={project.imgName}
                                            likes={project.likes}
                                            views={project.views}
                                            name={project.name}
                                            link={project.link}
                                            last_updated_date={project.last_updated_date}
                                        />
                                    ))
                                    :
                                    "Cannot find projects"
                        }
                    </div>


                </div>

                {/* Pagination */}

            </div>
        </MainLayout>
    );
};

export default Gallery;