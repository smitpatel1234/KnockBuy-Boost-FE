import type { NextPage, NextPageContext } from 'next';
import React from 'react';

interface ErrorPageProps {
  statusCode?: number ;
}

const CustomError: NextPage<ErrorPageProps> = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${String(statusCode)} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

CustomError.getInitialProps = ({ res }: NextPageContext) => {
  const statusCode = res ? res.statusCode :  404;
  return { statusCode };
};

export default CustomError;
