import { test, expect, request } from '@playwright/test';

test.describe.serial('Post_Get_Put', () => {

  async function apirequest() {
    return await request.newContext({
      baseURL: 'http://localhost:3000',
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    })
  }

  test('POST_1', async () => {
    const apiContext = await apirequest();
    // Created the product
    const postresponse = await apiContext.post('/products', {
      data: {
        id: 'DB_PGP',
        title: 'only_POST_GET_PUT',
        price: 1000,
      }
    });
    expect(postresponse.status()).toBe(201);

    const postdata = await postresponse.json();
    expect(postdata.title).toBe('only_POST_GET_PUT');
  });

  test('GET_1', async () => {
    const apiContext = await apirequest();

    // Created the product
    const getresponse = await apiContext.get('/products/DB_PGP')
    expect(getresponse.status()).toBe(200);

    const getdata = await getresponse.json();
    expect(getdata.title).toBe('only_POST_GET_PUT');
  });

  test('PUT_1', async () => {
    const apiContext = await apirequest();

    // Put for update
    const putresponse = await apiContext.put('/products/DB_PGP', {
      data: {
        title: 'Updated_POST_GET_PUT',
        price: 2000
      }
    });
    expect(putresponse.status()).toBe(200);

    const putdata = await putresponse.json();
    expect(putdata.title).toBe('Updated_POST_GET_PUT');
  });
});
