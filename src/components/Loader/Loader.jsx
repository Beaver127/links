import React from 'react';
import classes from './Loader.module.scss'
const Loader = () => {
    return (
        <div>
            <div className={classes.ldsHourglass}></div>
        </div>
    );
};

export default Loader;