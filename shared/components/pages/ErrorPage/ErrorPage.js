import React from 'react';
import { ErrorAndNotFound, Status } from '../../../components';

const ErrorPage = () => (
  <Status code={500}>
    <ErrorAndNotFound title="Something went wrong" smallSize>
      We have an internal server error. <a href="/">Try again?</a>
    </ErrorAndNotFound>
  </Status>
);

export default ErrorPage;
