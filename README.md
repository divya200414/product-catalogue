# ShopSphere – Product Catalogue

A responsive product catalogue built using React and Vite. It fetches product data from the DummyJSON API and allows users to search, filter, and sort products.

## Features

* Fetches products from the DummyJSON API
* Search products by name
* Filter products by category
* Filter products by minimum and maximum price
* Sort products by price and rating
* Displays an empty state when no products match
* Responsive layout for desktop, tablet, and mobile
* Loading and error states

## Technologies Used

* React
* Vite
* JavaScript
* CSS
* DummyJSON API

## Getting Started

### Prerequisites

Install Node.js and npm.

### Installation

1. Clone the repository:

   bash
   git clone https://github.com/divya200414/product-catalogue.git
   

2. Open the project folder:

   bash
   cd product-catalogue
   

3. Install dependencies:

   bash
   npm install
   

4. Start the development server:

   bash
   npm run dev
   

5. Open the local URL displayed in your terminal.

## API

Product data is fetched from:

https://dummyjson.com/products?limit=20

## Design Decisions

* React state manages search, category, price filters, and sorting.
* Product data is fetched from DummyJSON instead of using hardcoded products.
* CSS Grid and media queries provide a responsive layout.
* Loading, error, and empty states help users understand the current application status.
* Product prices are displayed in USD to match the API data.

## Author

Divya Saganaboyina
