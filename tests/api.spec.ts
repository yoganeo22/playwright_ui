import { test, expect } from '@playwright/test';

test('get request', async({ request }) => {
    const response = await request.get('http://api.openweathermap.org/geo/1.0/zip?', {
      params: {
        'zip': 'E14,GB',
        'appid': 'xx',
      }
    });
  
    console.log("response: " + await response.text());
    console.log("status: " + await response.status());
    const resp = await response.json();
    expect(resp).toHaveProperty("zip", "E14");
    expect(resp).toHaveProperty("name", "London");
    expect(resp).toHaveProperty("country", "GB");
})
  