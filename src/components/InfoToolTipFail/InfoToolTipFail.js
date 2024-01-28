import React from "react";
import InfoToolTips from "../InfoToolTips/InfoToolTips.js"
import fail from '../../images/Fail.svg';

function InfoToolTipFail({ isOpen, onClose }) {
    
    return (
        <InfoToolTips
            title="Что-то пошло не так! Попробуйте еще раз"
            tooltipImg={fail}
            name="toolTipFail"
            isOpen={isOpen}
            onClose={onClose}
        >
        </InfoToolTips>
    )
}

export default InfoToolTipFail;