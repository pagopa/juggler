import * as T from 'fp-ts/Task';
import { GetServerSideProps } from 'next';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type ApiViewerProps = {
  url?: string;
};

export const getServerSideProps: GetServerSideProps<ApiViewerProps> = () =>
  T.of({
    props: { url: '/api/openapi' },
  })();

const ApiViewer = (props: ApiViewerProps) => <SwaggerUI url={props.url} />;

export default ApiViewer;
