import * as T from 'fp-ts/Task';
import { GetServerSideProps } from 'next';
import { Alert } from '@mui/material';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { pipe } from 'fp-ts/lib/function';
import { fetchOpenApiContent } from '../adapters/openapi/getOpenApiSpec';

type ApiViewerProps = {
  spec: string;
  error: string | null;
};

export const getServerSideProps: GetServerSideProps<ApiViewerProps> = () => {
  const openApiUrlString = process.env.OPENAPI_URL || '';
  return pipe(
    fetchOpenApiContent(openApiUrlString),
    T.map(({ content: spec, fromOrigin }) => ({
      props: {
        spec,
        error: fromOrigin
          ? null
          : 'There was an error with the OpenAPI specification provided. Please check the URL and try again. Here is the OpenAPI specification of the Juggler.',
      },
    }))
  )();
};

const ApiViewer = ({ spec, error }: ApiViewerProps) => (
  <>
    <div>
      {
        // If there is an error retrieving the spec, show it
        error && (
          <Alert variant="filled" severity="warning">
            {error}
          </Alert>
        )
      }
      <SwaggerUI spec={spec} />
    </div>
  </>
);

export default ApiViewer;
