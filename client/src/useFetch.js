import { useState, useEffect } from 'react';
import { parseString, parseStringPromise } from 'xml2js';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

      fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (res.headers.get("Content-Type") === "application/xml") {
          console.log("getting xml");
          return res.text().then((text) => {
            console.log(text);
            return parseStringPromise(text).then((result) => {
              console.log(result);
              console.log(result.acknowledgements);
              return result
            })
          })
        } else {
          return res.json();
        }
        
      })
      .then(data => {
        if ("errorCode" in data) {
          throw Error(data.message)
        }
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      })

    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;