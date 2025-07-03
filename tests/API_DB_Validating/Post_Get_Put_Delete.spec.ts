import { test, expect, request } from '@playwright/test';

test.describe.serial('Post_Get_Put_Delete', () => {

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
        id: 'DB_PGPD',
        title: 'only_POST_GET_PUT_Delete',
        price: 1000,
      }
    });
    expect(postresponse.status()).toBe(201);

    const postdata = await postresponse.json();
    expect(postdata.title).toBe('only_POST_GET_PUT_Delete');
    console.log(postdata);
  });

  test('GET_1', async () => {
    const apiContext = await apirequest();

    // Created the product
    const getresponse = await apiContext.get('/products/DB_PGPD')
    expect(getresponse.status()).toBe(200);

    const getdata = await getresponse.json();
    expect(getdata.title).toBe('only_POST_GET_PUT_Delete');
    console.log(getdata);
  });

  test('PUT_1', async ({page}) => {
    const apiContext = await apirequest();

    // Put for update
    const putresponse = await apiContext.put('/products/DB_PGPD', {
      data: {
        title: 'Updated_POST_GET_PUT_Delete',
        price: 2000
      }
    });
    expect(putresponse.status()).toBe(200);

    const putdata = await putresponse.json();
    expect(putdata.title).toBe('Updated_POST_GET_PUT_Delete');
    console.log(putresponse);   
    await page.waitForTimeout(4000);
  });

  test('DELETE_1', async () => {
    const apiContext = await apirequest();

    // Delete in DB
    const deleteresponse = await apiContext.delete('/products/DB_PGPD');
    expect(deleteresponse.status()).toBe(200);
    console.log(deleteresponse);    
  });
});