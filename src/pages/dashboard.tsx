import useSWR from 'swr';
import JsonViewer from '@textea/json-viewer';

const HomePage = () => {
  // For now keep it simple, but at some point create a separate
  // method where check the status code and parse the response
  const { data } = useSWR('/api/requestresponse', (url: string) =>
    fetch(url).then((res) => res.json())
  );

  return (
    <div>
      <JsonViewer
        name={false}
        src={data}
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
