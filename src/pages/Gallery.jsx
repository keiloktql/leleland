import React, { useState, useEffect } from 'react';
import MainLayout from '../layout/MainLayout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ProjectCard from '../components/ProjectCard';
import ENUMS from '../config/enums';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import ProjectCardSkeleton from '../components/loading/ProjectCardSkeleton';

const Gallery = () => {

    // States
    const [projects, setProjects] = useState([]);
    const [searchProjects, setSearchProjects] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [pageStatus, setPageStatus] = useState(ENUMS.pageStatus.LOADING);

    // useEffect
    useEffect(() => {
        const fakeProjects = [
            {
                id: 1,
                name: "Color Picker",
                link: "/gallery/color-picker",
                likes: "10",
                imgName: `Logo-colorful.png`
            },
            {
                id: 2,
                name: "Color Palette Generator",
                link: "/gallery/color-picker",
                likes: "10",
                imgName: `Logo-colorful.png`
            },
            {
                id: 3,
                name: "Search",
                link: "/gallery/color-picker",
                likes: "10",
                imgName: `Logo-colorful.png`
            }
        ];

        let componentMounted = true;
        (async () => {
            try {
                if (componentMounted) {
                    setProjects(() => fakeProjects);
                    setSearchProjects(() => fakeProjects);
                    setTimeout(() => {
                        setPageStatus(() => ENUMS.pageStatus.IDLE);
                    }, 500);

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

    // Handlers
    const handleSearchSubmit = (reset, event) => {

        if (projects.length < 1) {
            return;
        }

        let searchInputValue = "";

        if (!reset) {
            searchInputValue = searchInput.toLowerCase();
        }

        let matchSearchArr = [];

        projects.forEach((project) => {
            let projectNameLowercase = project.name.toLowerCase();
            let matchSearch = projectNameLowercase.includes(searchInputValue.toLowerCase());
            if (matchSearch) {
                matchSearchArr.push(project);
            }
        });

        setSearchProjects(() => matchSearchArr);
        console.log(searchInputValue)
        console.log(matchSearchArr)

    };

    return (
        <MainLayout title="Gallery">
            <div className="c-Gallery">
                <div className="c-Gallery__Top">
                    {/* Breadcrumb */}
                    <Breadcrumb className="c-Gallery__Breadcrumb l-Breadcrumb">
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Gallery</Breadcrumb.Item>
                    </Breadcrumb>

                    <div className = "c-Gallery__Heading">
                        <h1>Search LeLeLand</h1>
                        <p>Sign in to "like" your favourite projects</p>
                    </div>
                </div>

                {/* Search */}
                <div className="c-Gallery__Search">
                    <SearchBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        data={projects}
                        handleSearchSubmit={handleSearchSubmit}
                    />
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
                                            name={project.name}
                                            link={project.link}
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