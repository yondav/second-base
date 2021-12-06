import styled from 'styled-components';

export const NavLink = styled.a`
  font-size: 0.875em;
  font-weight: 400;
  text-decoration: none;
  color: var(--primary-white);
  white-space: nowrap;
  transition: var(--transition);

  &:hover {
    color: #fff;
  }

  &:focus {
    color: #fff;
  }

  &:focus-visible {
    color: #fff;
  }
`;
