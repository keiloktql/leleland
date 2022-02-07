import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const ProjectCardSkeleton = () => {
    return <div className="c-Project-card-skeleton">
        <Skeleton variant="rectangular" width={"100%"} height={100} />
        <Skeleton variant="text" width={50} />
        <Skeleton variant="text" width={100} />
    </div>;
};

export default ProjectCardSkeleton;