import * as T from 'fp-ts/Task';
import * as TE from 'fp-ts/lib/TaskEither';
import { GetServerSideProps } from 'next';
import { Alert } from '@mui/material';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { pipe } from 'fp-ts/lib/function';
import { fetchOpenApiContent } from '../adapters/openapi/getOpenApiSpec';
import path from "path";

type ApiViewerProps = {
  spec: string | null;
  error: string | null;
};

export const getServerSideProps: GetServerSideProps<ApiViewerProps> = () => {
  const openApiUrlString = process.env.OPENAPI_URL || '';
  const jugglerOpenApiPath = path.resolve('docs/openapi/juggler.yaml');
  return pipe(
    fetchOpenApiContent(openApiUrlString, jugglerOpenApiPath),
    TE.foldW(
      ({ message }) =>
        T.of({
          props: {
            spec: null,
            error: message,
          },
        }),
      ({ content, fromOrigin }) =>
        T.of({
          props: {
            spec: content,
            error: fromOrigin
              ? null
              : 'There was an error with the OpenAPI specification provided. Please check the URL and try again. Here is the OpenAPI specification of the Juggler.',
          },
        })
    )
  )();
};

const ApiViewer = ({ spec, error }: ApiViewerProps) => (
  <div>
    {
      // If there is an error retrieving the spec, show it
      error && (
        <Alert variant="filled" severity="warning">
          {error}
        </Alert>
      )
    }
    {spec && <SwaggerUI spec={spec} />}
  </div>
);

export default ApiViewer;
