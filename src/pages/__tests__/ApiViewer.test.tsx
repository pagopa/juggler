import { render, screen } from '@testing-library/react';
import ApiViewer from '../openapi';

const minimalOpenApiSpec = JSON.stringify({
  openapi: '3.0.0',
  info: {
    title: 'Title',
    version: '1.0.0',
  },
  paths: {
    '/path': {
      get: {
        description: 'get',
        responses: {
          '200': {
            description: 'ok',
            content: {
              'text/plain': {},
            },
          },
        },
      },
    },
  },
});

describe('ApiViewer', () => {
  it('should render the alert', async () => {
    const errorMessage = 'an error message';
    render(<ApiViewer error={errorMessage} spec={null} />);
    const warningPanel = screen.queryByTestId('warning-panel');
    expect(warningPanel).toBeInTheDocument();
    expect(warningPanel).toHaveTextContent(errorMessage);
  });

  it('should render the OpenAPI spec', () => {
    render(<ApiViewer error={null} spec={minimalOpenApiSpec} />);
    const openApiDoc = screen.queryByTestId('openapi-doc');
    expect(openApiDoc).toBeInTheDocument();
  });
});
