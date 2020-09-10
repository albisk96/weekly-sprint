import React from 'react';
import ArchiveSprint from '../modal/sprint-items-modal.component';

const ArchiveList = ({ archive }) => (
    archive.map((x, index) => (
        <ArchiveSprint item={x} id={index} key={index} />
    ))
)

export default ArchiveList;