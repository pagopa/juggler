import { API } from '@stoplight/elements';
import '@stoplight/elements/styles.min.css';

const ApiViewer = () => (
  <API
    apiDescriptionUrl="/api/openapi"
    basePath={'/ui/openapi'}
    router={typeof window === 'undefined' ? 'memory' : 'history'}
    hideInternal={true}
    hideExport={true}
    hideTryIt={true} // We are going to enable in later
  />
);

export default ApiViewer;
