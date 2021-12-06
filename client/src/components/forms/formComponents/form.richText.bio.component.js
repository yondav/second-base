import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Form } from 'react-bootstrap';
import { RichTextToolbar, RichTextButton, Column } from '../../styled';
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
    <Column xs={12}>
      <Form.Group className='text-editor px-0 mb-5'>
        <Form.Label>Bio</Form.Label>
        <RichTextToolbar id='toolbar'>
          <span className='ql-formats'>
            <RichTextButton className='ql-bold' />
            <RichTextButton className='ql-italic' />
            <RichTextButton className='ql-underline' />
            <RichTextButton className='ql-strike' />
          </span>
          <span className='ql-formats'>
            <RichTextButton className='ql-list' value='ordered' />
            <RichTextButton className='ql-list' value='bullet' />
            <RichTextButton className='ql-indent' value='-1' />
            <RichTextButton className='ql-indent' value='+1' />
          </span>
          <span className='ql-formats'>
            <RichTextButton className='ql-link' />
          </span>
        </RichTextToolbar>
        <ReactQuill
          theme='snow'
          value={textValue.value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          style={{
            height: '15rem',
            borderBottom: '1px solid #ced4da',
            borderLeft: '1px solid #ced4da',
            borderRight: '1px solid #ced4da',
            borderBottomLeftRadius: '0.25rem',
            borderBottomRightRadius: '0.25rem',
          }}
        >
          <div style={{ border: 'none' }} />
        </ReactQuill>
      </Form.Group>
    </Column>
  );
};

export default RichTextBio;
