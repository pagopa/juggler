import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { GetServerSideProps } from 'next';
import { Alert } from '@mui/material';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { pipe } from 'fp-ts/lib/function';
import SwaggerParser from '@apidevtools/swagger-parser';
import { parseConfig } from '../config';

// We could create two different types and let the ApiViewerProps type be a union of them.
type ApiViewerProps = {
  spec: string | null;
  error: string | null;
};

export const getServerSideProps: GetServerSideProps<ApiViewerProps> = () =>
  pipe(
    parseConfig(process.env),
    TE.fromEither,
    TE.chain(({ openapi: { URL: url } }) =>
      pipe(
        TE.tryCatch(
          () => SwaggerParser.bundle(url),
          (_) => `It wasn't possible to parse the OpenAPI specified at ${url}`
        ),
        TE.map(JSON.stringify)
      )
    ),
    TE.foldW(
      (error) =>
        T.of({
          props: {
            spec: null,
            error,
          },
        }),
      (spec) =>
        T.of({
          props: {
            spec,
            error: null,
          },
        })
    )
  )();

const ApiViewer = ({ spec, error }: ApiViewerProps) => (
  <div>
    {
      // If there is an error retrieving the spec, show it
      error && (
        <div data-testid="warning-panel">
          <Alert variant="filled" severity="warning">
            {error}
          </Alert>
        </div>
      )
    }
    {
      // If there is the OpenAPI spec, show it
      spec && (
        <div data-testid="openapi-doc">
          <SwaggerUI spec={spec} />
        </div>
      )
    }
  </div>
);

export default ApiViewer;
