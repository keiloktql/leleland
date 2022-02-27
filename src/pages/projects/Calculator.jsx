import React, { createRef, useState, useEffect } from 'react';
import { projectList } from '../../data/projects';
import ProjectLayout from '../../layout/ProjectLayout';

const Calculator = () => {
    const projectID = projectList[0].id;
    const project = projectList[0];

    const subLinkArr = [
        {
            name: "Demo",
            ref: createRef("")
        },
    ];

    return (
        <ProjectLayout
            title="Calculator • LeLeLand"
            subTitle="Calculator"
            subLinkArr={subLinkArr}
            projectID={projectID}
            project={project}>
            <div className="c-Calculator">
                {/* Demo */}
                <div ref={subLinkArr[0].ref} className="c-Calculator__Demo">
                    <div className="c-Demo">

                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
};

export default Calculator;