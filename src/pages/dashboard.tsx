import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

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
      <DynamicReactJson
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
