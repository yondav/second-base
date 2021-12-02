import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

export const FormSelect = styled(Form.Select)`
  padding: 1rem 0.75rem;

  &:focus {
    border-color: transparent;
    box-shadow: var(--shadow);
    outline: none;
  }

  &:focus-visible {
    border-color: transparent;
    box-shadow: var(--shadow);
    outline: none;
  }
`;
