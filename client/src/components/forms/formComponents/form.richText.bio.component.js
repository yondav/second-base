import React, { useState, useRef, useEffect, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { toTitle } from '../../../utils/helperFuncs';
import { Grid, Form } from '../../styled';

const RichText = ({ value, name, setFormData }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const config = {
    buttons: 'italic,underline',
    readonly: false,
    height: 400,
  };

  useEffect(() => setFormData(prev => ({ ...prev, bio: content })), [content]);
  return useMemo(
    () => (
      <Grid.Col>
        <Form.Group>
          <Form.Label group htmlFor={name}>
            {toTitle(name)}
          </Form.Label>
          <Form.RichText>
            <JoditEditor
              ref={editor}
              name={name}
              value={value || ''}
              config={config}
              onBlur={newContent => setContent(newContent)}
              onChange={newContent => setContent(newContent)}
            />
          </Form.RichText>
        </Form.Group>
      </Grid.Col>
    ),
    []
  );
};

export default RichText;
