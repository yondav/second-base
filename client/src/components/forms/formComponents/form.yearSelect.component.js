import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Column, FormSelect } from '../../styled';

const YearSelect = ({ xs, md, name }) => {
  const [yearsOptions, setYearsOptions] = useState([]);

  const yearsOptSetter = () => {
    const now = new Date().getUTCFullYear();
    const years = Array(now - (now - 100))
      .fill('')
      .map((v, i) => now - i);

    setYearsOptions(years);
  };

  useEffect(() => yearsOptSetter(), []);
  return (
    <Column xs={xs} md={md}>
      <Form.Group className='mb-5'>
        <Form.Label>Year</Form.Label>
        <FormSelect type='text' name={name}>
          <option>Select Year</option>
          {yearsOptions.map((yr, i) => (
            <option key={i} value={yr}>
              {yr}
            </option>
          ))}
        </FormSelect>
      </Form.Group>
    </Column>
  );
};

export default YearSelect;
