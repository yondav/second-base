import React from 'react';
import Alert from '../../alert';
import { Grid } from '../../styled';
import { ButtonGroup } from '.';

const FormWrapper = ({ handleSubmit, setEdit, children, alert }) => {
  return (
    <form className='my-8' onSubmit={handleSubmit}>
      <Grid.Container>
        {alert ? (
          <Grid.Col>
            <Alert alert={alert} />
          </Grid.Col>
        ) : (
          <>
            {children}
            <Grid.Col>
              <ButtonGroup
                handleCancel={() => setEdit(false)}
                handleSubmit={handleSubmit}
              />
            </Grid.Col>
          </>
        )}
      </Grid.Container>
    </form>
  );
};

export default FormWrapper;
