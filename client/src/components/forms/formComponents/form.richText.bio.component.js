import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Form, Grid } from '../../styled';
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

const RichTextBio = ({ setFormData, value, name }) => {
  const [textValue, setTextValue] = useState({ value: value || null });
  const handleChange = value => {
    setTextValue({ value });
  };

  useEffect(
    () => setFormData(prev => ({ ...prev, bio: textValue.value })),
    [textValue.value]
  );

  return (
    <Grid.Col xs={12}>
      <Form.Group className='text-editor px-0 mb-5'>
        <Form.Label htmlFor={name} group>
          Bio
        </Form.Label>
        <Form.RichText.Toolbar id='toolbar'>
          <div className='ql-formats w-1/3'>
            <Form.RichText.Button className='ql-bold' />
            <Form.RichText.Button className='ql-italic' />
            <Form.RichText.Button className='ql-underline' />
            <Form.RichText.Button className='ql-strike' />
          </div>
          <div className='ql-formats w-1/3'>
            <Form.RichText.Button className='ql-list' value='ordered' />
            <Form.RichText.Button className='ql-list' value='bullet' />
            <Form.RichText.Button className='ql-indent' value='-1' />
            <Form.RichText.Button className='ql-indent' value='+1' />
          </div>
          <div className='ql-formats w-1/3'>
            <Form.RichText.Button className='ql-link' />
          </div>
        </Form.RichText.Toolbar>
        <ReactQuill
          name={name}
          theme='snow'
          value={textValue.value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className='h-60	border-b border-l border-r border-gray-150 rounded-b-lg'
          // style={{
          //   height: '15rem',
          //   borderBottom: '1px solid #ced4da',
          //   borderLeft: '1px solid #ced4da',
          //   borderRight: '1px solid #ced4da',
          //   borderBottomLeftRadius: '0.25rem',
          //   borderBottomRightRadius: '0.25rem',
          // }}
        >
          <div style={{ border: 'none' }} />
        </ReactQuill>
      </Form.Group>
    </Grid.Col>
  );
};

export default RichTextBio;
