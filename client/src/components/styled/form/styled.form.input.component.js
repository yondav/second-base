import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

export const FormInput = styled(Form.Control)`
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

export const FormTextArea = styled(Form.Control)`
  padding: 1rem 0.75rem;
  display: block;
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

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
