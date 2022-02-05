import React, {useState} from 'react';
import MainLayout from '../layout/MainLayout';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

const Gallery = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleInputChange = (event) => {
        setSearchInput((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <MainLayout title="Gallery">
            <div className="c-Gallery">
                {/* Breadcrumb */}
                <Breadcrumb className="c-Gallery__Breadcrumb l-Breadcrumb">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Gallery</Breadcrumb.Item>
                </Breadcrumb>
                {/* Search */}
                <div className="c-Gallery__Search">
                    <div className="c-Search">
                        <IconContext.Provider className = "c-Search__Icon" value={{ color: "#1C1C1C", size: "21px" }}>
                            <AiIcons.AiOutlineSearch />
                        </IconContext.Provider>
                        <input type="text" placeholder="Search for project..." value = {searchInput} onChange={(event) => handleInputChange(event)}/>
                    </div>
                </div>
                {/* Projects */}

                {/* Pagination */}
            </div>
        </MainLayout>
    );
};

export default Gallery;