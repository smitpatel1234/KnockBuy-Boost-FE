import { NextPage, NextPageContext } from 'next';
import NextErrorComponent from 'next/error';
import React from 'react';

interface ErrorPageProps {
  statusCode?: number ;
}

const CustomError: NextPage<ErrorPageProps> = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
