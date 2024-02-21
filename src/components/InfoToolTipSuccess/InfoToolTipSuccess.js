import React from "react";
import InfoToolTips from "../InfoToolTips/InfoToolTips.js"
import success from '../../images/Success.svg';

function InfoToolTipSuccess({ isOpen, onClose }) {
    
    return (
        <InfoToolTips
            title="Вход выполнен успешно!"
            tooltipImg={success}
            name="toolTipSuccess"
            isOpen={isOpen}
            onClose={onClose}
        >
        </InfoToolTips>
    )
}

export default InfoToolTipSuccess;