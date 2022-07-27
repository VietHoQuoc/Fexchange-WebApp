import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateInput = (props) => {
    const [date, setDate] = useState(new Date());
    const { data, onChange, ...rest } = props;

    return (
        <DatePicker selected={date} onChange={() => onChange(date)} {...rest} />
    );
};

export default DateInput;
