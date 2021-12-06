import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

export const SmCarouselItem = styled(Carousel.Item)`
  padding: 1rem;
  height: 25rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: var(--radius);
  border-top-left-radius: 0px;
`;

export const SmCarouselImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
