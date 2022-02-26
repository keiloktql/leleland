import React, { createRef, useState, useEffect } from 'react';
import { projectList } from '../../data/projects';
import ProjectLayout from '../../layout/ProjectLayout';

const ColorPicker = () => {
    const projectID = projectList[0].id;
    const project = projectList[0];

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
        <ProjectLayout
            title="Color Picker • LeLeLand"
            subTitle="Color Picker"
            subLinkArr={subLinkArr}
            projectID={projectID}
            project={project}>
            <div className="c-Color-picker">
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
        </ProjectLayout>
    );
};

export default ColorPicker;