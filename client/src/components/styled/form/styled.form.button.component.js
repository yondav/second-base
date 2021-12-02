import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

export const FormButton = styled(Button)`
  padding: 1rem;
  color: var(--primary-black);
  border-color: var(--primary-black);

  &:hover {
    color: var(--primary-white);
    background-color: var(--primary-black);
    border-color: var(--primary-black);
    outline: none;
  }

  &:active {
    color: var(--primary-white);
    background-color: var(--primary-black);
    border-color: var(--primary-black);
    outline: none;
  }

  &:focus {
    box-shadow: var(--shadow);
    outline: none;
  }

  &:focus-visible {
    box-shadow: var(--shadow);
    outline: none;
  }
`;
