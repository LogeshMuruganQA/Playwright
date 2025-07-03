import { test, expect, request } from '@playwright/test';

test('POST1_GET1_PUT1', async ({ }) => {

  const apicontext = await request.newContext({
    baseURL: 'http://localhost:3000',
    extraHTTPHeaders: {
      'Content-type': 'application/json'
    }
  });

  // Created the product
  const postresponse = await apicontext.post('/products', {
    data: {
      id: '3',
      title: 'micromax',
      price: 1000,
    }
  });
  expect(postresponse.status()).toBe(201);

  const postdata = await postresponse.json();
  expect(postdata.title).toBe('micromax');

  //Get the product
  const getresponse = await apicontext.get('/products/3')
  expect(getresponse.status()).toBe(200);

  const getdata = await getresponse.json();
  expect(getdata.title).toBe('micromax');

  // Put for update
  const putresponse = await apicontext.put('/products/3', {
    data: {
      title: 'Updated Micromax',
      price: '200'
    }
  });
  expect(putresponse.status()).toBe(200);

  const putdata = await putresponse.json();
  expect(putdata.title).toBe('Updated Micromax');
});