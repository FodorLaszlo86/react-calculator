import React from 'react';
import PhotoCells from '../Header/PhotoCells/PhotoCells';
import Title from '../Header/Title/Title';
import headerStyle from './Header.css';

const header = () => (
    <div className={ headerStyle.Header }>
        <Title />
        <PhotoCells />
    </div>
)

export default header;