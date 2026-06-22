const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App element not found");
}

app.innerHTML = `
  <h1>AJT DevDash</h1>
  <p>Day 1 setup completed.</p>
`;