import React, { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import { FormSelect } from '../../styled/form';

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
    <Col xs={xs} md={md}>
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
    </Col>
  );
};

export default YearSelect;
