import React from 'react';
import { Tooltip } from 'react-bootstrap';

const SuccessTooltip = <Tooltip className="bg-success">Success</Tooltip>;

const TooltipBox = (props) => {
    return (
        <Tooltip className="bg-white" {...props}>
            You need to choose a category
        </Tooltip>
    );
};

export default TooltipBox;
