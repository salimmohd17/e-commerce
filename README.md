# CoastCart — Web Designing 2 project

A responsive ecommerce storefront for practising the HTML, CSS and JavaScript topics covered so far. The frontend is static and needs no build tool. A small Node.js API starter is included for deployment practice; it does not yet provide ecommerce, database or payment functionality.

## Run it

1. Open the project folder in VS Code.
2. Use the **Live Server** extension and choose **Open with Live Server** on `index.html`.

Use an HTTP server rather than opening `index.html` directly: the page fetches its HTML components, which browsers block from `file://` URLs.

## Deploy

### Git

Create a repository on your Git hosting provider, then run these commands from the project folder:

```sh
git init
git add .
git commit -m "Prepare CoastCart for deployment"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

`.gitignore` excludes dependencies, local environment files and deployment tooling. Do not commit secrets.

### Frontend on Vercel

1. Import the Git repository into Vercel.
2. Select the project folder as the root directory.
3. Leave the build command and output directory empty; this is a static HTML/CSS/JavaScript site.
4. Deploy. Vercel serves `index.html` and the existing `css/`, `js/`, `components/` and `images/` folders. `vercel.json` adds basic response security headers.

### API starter on Render

The root `render.yaml` describes a separate web service whose root directory is `server/`.

1. In Render, create a **Blueprint** from the same Git repository and approve the `coastcart-api` web service.
2. Set `FRONTEND_ORIGIN` to your Vercel site's exact origin (for example, `https://your-site.vercel.app`). For multiple origins, separate them with commas.
3. Render installs the API dependencies and starts the server from `server/package.json`. Its health check is `GET /api/health`.
4. The API currently provides only a health check; the storefront does not call it yet. Products are still bundled in frontend JavaScript, the cart stays in browser `localStorage`, and checkout, accounts, newsletter submission, database storage and payment processing are not implemented.

To run the API locally, install Node.js 20 or newer, then run:

```sh
cd server
npm install
npm start
```

The health endpoint is available at `http://localhost:3000/api/health`. Local development allows common Live Server origins on port 5500.

## Features

- Responsive store layout for desktop, tablet and phone.
- Product cards generated from an array of objects in `js/products.js`.
- Search products by name, category or description.
- Filter by category and sort by price or name.
- Add products to the cart, change quantities, remove items and clear the cart.
- Cart contents persist in browser `localStorage`.
- Demo newsletter form with basic browser email validation.
- Semantic HTML, labels, keyboard escape-to-close cart and live status messages.

## Where your Web Designing 2 topics appear

| Topic | Where to study |
|---|---|
| HTML structure and forms | `index.html` |
| CSS selectors, box model, grid, flexbox, media queries | `css/style.css` |
| Variables, arrays and objects | `js/products.js`, top of `js/app.js` |
| Functions | `js/app.js` functions such as `renderProducts()` and `addToCart()` |
| Control structures | `switch` in `getVisibleProducts()` and `if` checks throughout `app.js` |
| DOM selection and updates | `document.querySelector`, `innerHTML`, `textContent` |
| Events | `addEventListener` handlers in `app.js` |
| Forms and validation | Search form and newsletter form in `index.html` / `app.js` |
| Browser storage | `localStorage` cart save and restore |

## Beginner exercises

1. Add a new product object in `js/products.js`. Give it a unique `id`, name, category, price, emoji, tag, background colour and description.
2. Add a new category and filter button in `index.html`.
3. Add a product-count message when a user adds an item.
4. Add a minimum/maximum price filter.
5. Add a product detail modal.
6. Replace the emoji product illustrations with your own local images.
7. Validate a checkout form with JavaScript (do not collect real payment details).

## Important limitations

This is a learning demo. The API is only a deployment starter: products are stored in a JavaScript file, the cart is stored only in the current browser, and the newsletter does not send data to a server. Checkout does not place an order and no payment is processed.

The next phase can extend the Node.js API with server-side validation, a database, user accounts, orders and an admin product dashboard. Never store passwords or payment-card details in plain text.
