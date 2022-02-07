import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = ({variant}) => {
    return (
        <div className="c-Loading-spinner">
            <Spinner animation="border" role="status" variant={variant}/>
        </div>
    );
};

export default LoadingSpinner;