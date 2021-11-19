import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Card, Container } from 'react-bootstrap';
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

const RichTextBio = () => {
  const [textValue, setTextValue] = useState({ value: null });
  const handleChange = value => setTextValue({ value });

  return (
    <Card>
      <Container className='p-0'>
        <Card.Body className='text-editor px-0'>
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
        </Card.Body>
      </Container>
    </Card>
  );
};

export default RichTextBio;
