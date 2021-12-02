import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

export const FormCheck = styled(Form.Check)`
  height: fit-content !important;
  width: fit-content !important;
  &:focus {
    box-shadow: var(--shadow);
    outline: none;
  }

  &:focus-visible {
    color: var(--primary-white);
    background-color: var(--primary-black);
    border-color: var(--primary-black);
    outline: none;
  }

  &:checked {
    color: var(--primary-white);
    background-color: var(--primary-black);
    border-color: var(--primary-black);
    outline: none;
  }
`;
