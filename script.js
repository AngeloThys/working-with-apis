'use strict';

const protocol = 'https';
const url = 'api.giphy.com/v1/gifs/translate';
const key = 'eQiIVJ4r6JEXPHbEcPQW8sUfGMOFPft1';
const options = {
  mode: 'cors',
};

const defaultResource = generateResource(protocol, url, key, 'cats');
makeFetchRequest(defaultResource, options);

const generateButton = document.querySelector('.gif-generate-button');
generateButton.addEventListener('click', () => {
  const searchTerm = document.querySelector('.gif-search-input').value;
  const resource = generateResource(protocol, url, key, searchTerm);

  makeFetchRequest(resource, options);
});

function onFulfilled(response) {
  const gif = document.querySelector('.gif-container__gif');
  if (response.meta.status !== 200) {
    gif.src = `https://http.cat/${response.meta.status}`;
  } else if (response.data.length === 0) {
    gif.src = './images/no-results.gif';
  } else {
    gif.src = response.data.images.original.url;
  }
}

function onRejected(error) {
  console.error(error);
}

function generateResource(protocol, url, key, searchTerm) {
  return `${protocol}://${url}?api_key=${key}&s=${searchTerm}`;
}

async function makeFetchRequest(resource, options) {
  try {
    const response = await fetch(resource, options);
    const responseBody = await response.json();
    onFulfilled(responseBody);
  } catch {
    onRejected(err);
  }
}
