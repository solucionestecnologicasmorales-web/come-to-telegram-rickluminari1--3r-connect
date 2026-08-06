import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:4173');
  console.log('Page loaded');
  
  // Wait for properties
  await page.waitForSelector('.app-container');
  console.log('App loaded');
  
  // Click on "Ver Embudo" of the first property
  const props = await page.$$('span');
  for (const p of props) {
    const text = await page.evaluate(el => el.textContent, p);
    if (text === 'Ver Embudo') {
      await p.click();
      console.log('Clicked Ver Embudo');
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Click on a stage in the funnel
  const stages = await page.$$('div');
  let clickedStage = false;
  for (const s of stages) {
    const text = await page.evaluate(el => el.textContent, s);
    if (text && text.includes('Venta Cerrada') || text.includes('Negociación')) {
      await s.click();
      console.log('Clicked Stage');
      clickedStage = true;
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Click on a client row
  const rows = await page.$$('tr');
  if (rows.length > 1) {
    await rows[1].click(); // First data row
    console.log('Clicked Client');
  } else {
    console.log('No clients found in this stage');
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  // Check if client view is visible
  const content = await page.content();
  if (content.includes('Notas del Asesor')) {
    console.log('Client view IS visible');
  } else {
    console.log('Client view is NOT visible');
  }
  
  await browser.close();
})();
