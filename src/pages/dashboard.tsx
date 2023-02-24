import JsonViewer from '@textea/json-viewer';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [requestResponse, setRequestResponse] = useState([]);

  const fetchData = () => {
    fetch('http://localhost:8080/api/requestresponse')
      .then((response) => response.json())
      .then((data) => setRequestResponse(data))
      .catch(() => setRequestResponse([]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <JsonViewer
        name={false}
        src={requestResponse}
        collapsed={2}
        iconStyle={'triangle'}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        theme={'ocean'}
      />
    </div>
  );
};

export default HomePage;
