import styled from 'styled-components';

export const RichTextToolbar = styled.div`
  padding: 1rem 0.75rem;
  border: 1px solid #ced4da;
`;

export const RichTextButton = styled.button`
  margin: 0 0.15rem;
  border-radius: var(--radius);
  transition: var(--transition);

  &:hover {
    border: none;
    outline: none;
    box-shadow: var(--shadow);
  }

  &:focus {
    border: none;
    outline: none;
    box-shadow: var(--shadow);
  }

  &:focus-visible {
    border: none;
    outline: none;
    box-shadow: var(--shadow);
  }
`;
