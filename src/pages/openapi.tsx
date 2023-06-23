import { API } from '@stoplight/elements';
import '@stoplight/elements/styles.min.css';

const ApiViewer = () => (
  <API
    apiDescriptionUrl="/api/openapi"
    router={typeof window === 'undefined' ? 'memory' : 'history'}
    hideInternal={true}
    hideExport={true}
  />
);

export default ApiViewer;
