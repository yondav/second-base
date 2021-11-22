import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Form, Col } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: {
    container: '#toolbar',
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'list',
  'bullet',
  'indent',
  'link',
];

const RichTextBio = ({ setFormData, value }) => {
  const [textValue, setTextValue] = useState({ value: value || null });
  const handleChange = value => {
    setTextValue({ value });
  };

  useEffect(
    () => setFormData(prev => ({ ...prev, bio: textValue.value })),
    [textValue.value]
  );

  return (
    <Col xs={12}>
      <Form.Group className='text-editor px-0 mb-5'>
        <Form.Label>Bio</Form.Label>
        <div id='toolbar'>
          <span className='ql-formats'>
            <button className='ql-bold' />
            <button className='ql-italic' />
            <button className='ql-underline' />
            <button className='ql-strike' />
          </span>
          <span className='ql-formats'>
            <button className='ql-list' value='ordered' />
            <button className='ql-list' value='bullet' />
            <button className='ql-indent' value='-1' />
            <button className='ql-indent' value='+1' />
          </span>
          <span className='ql-formats'>
            <select className='ql-align' />
          </span>
          <span className='ql-formats'>
            <button className='ql-link' />
          </span>
        </div>
        <ReactQuill
          theme='snow'
          value={textValue.value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </Form.Group>
    </Col>
  );
};

export default RichTextBio;
