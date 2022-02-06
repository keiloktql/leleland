import React, { createRef } from 'react';
import MainLayout from '../../layout/MainLayout';
import { NavLink } from 'react-router-dom';
import Enums from '../../config/enums';
import SubHeader from '../../layout/SubHeader';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const ColorPicker = () => {

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

    return (
        <MainLayout title="Color Picker" headerFixed={false} headerTheme={Enums.headerTheme.DARK}>
            <SubHeader
                name="Color Picker"
                subLinkArr={subLinkArr}
            />
            <div className="c-Color-picker">
                {/* Breadcrumb */}
                <Breadcrumb className="c-Gallery__Breadcrumb l-Breadcrumb">
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/gallery">Gallery</Breadcrumb.Item>
                    <Breadcrumb.Item active>Color Picker</Breadcrumb.Item>
                </Breadcrumb>
                <div ref={subLinkArr[0].ref} className="c-Color-picker__Demo">

                </div>
                <div ref={subLinkArr[1].ref} className="c-Color-picker__Story">

                </div>
            </div>
        </MainLayout>
    );
};

export default ColorPicker;