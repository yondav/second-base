import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { VscAdd, VscRemove } from 'react-icons/all';
import { Input } from './index';

const streams = [
  { val: 'artist_site', display: "Artist's Site" },
  { val: 'spotify', display: 'Spotify' },
  { val: 'bandcamp', display: 'Bandcamp' },
  { val: 'apple_music', display: 'Apple Music' },
  { val: 'itunes', display: 'iTunes' },
  { val: 'youtube_music', display: 'YouTube Music' },
  { val: 'tidal', display: 'Tidal' },
];

const StreamLink = ({ linkList, setLinkList, idx }) => {
  const handleInputChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...linkList];
    list[i][name] = value;
    setLinkList(list);
  };

  const handleRemoveClick = i => {
    const list = [...linkList];
    list.splice(i, 1);
    setLinkList(list);
  };

  const handleAddClick = () => {
    setLinkList([...linkList, { link_service: '', link: '' }]);
  };

  return (
    <>
      <Col xs={4}>
        <Form.Group className='mb-5'>
          <Form.Label>Service</Form.Label>
          <Form.Select
            type='text'
            name='link_service'
            onChange={e => handleInputChange(e, idx)}
          >
            <option>Select</option>
            {streams.map((stream, i) => (
              <option key={i} value={stream.val}>
                {stream.display}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Input
        label='URL'
        type='text'
        name='link'
        xs={6}
        changehandler={e => handleInputChange(e, idx)}
      />
      <Col xs={2} className='d-flex'>
        {linkList.length !== 1 && (
          <div className='d-flex flex-column justify-content-end align-items-center mb-5 ml-1'>
            <Form.Label style={{ color: 'transparent' }}>Remove</Form.Label>
            <Button
              variant='outline-dark'
              type='button'
              onClick={() => handleRemoveClick(idx)}
            >
              <VscRemove />
            </Button>
          </div>
        )}
        {linkList.length - 1 === idx && (
          <div className='d-flex flex-column justify-content-end align-items-center mb-5'>
            <Form.Label style={{ color: 'transparent' }}>Add</Form.Label>
            <Button
              variant='outline-dark'
              type='button'
              onClick={handleAddClick}
            >
              <VscAdd />
            </Button>
          </div>
        )}
      </Col>
    </>
  );
};

export default StreamLink;
