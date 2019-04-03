const URL = 'http://localhost:5000/data';

const HEADERS = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json'
});

const getData = async () => {
  let response = await fetch(URL, {
    headers: HEADERS
  });
  let result = await response.json();
  return result.features;
};

export { getData };
