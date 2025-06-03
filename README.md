# NASDAQ Display

[![Playwright Tests](https://github.com/csj606/nasdaq-display/actions/workflows/github-actions-demo.yml/badge.svg)](https://github.com/csj606/nasdaq-display/actions/workflows/github-actions-demo.yml)

## Overview

This application is a simple web display showing the most recent prices for the NASDAQ 100 index. Most financial websites have good visualizations showcasing the prices for the S&P 500. However, while there is some overlap, the NASDAQ 100 has some individual companies which are not included in the S&P 500. This website shows the list of companies which make up the NASDAQ 100 and allows users to see the company fundamentals in separate pages.

## Features

The home page has the following features:

- Displays the ticker, name, and current price for all NASDAQ 100 companies (excluding the class A stock of Google)
- Clicking on the ticker will take you to a page containing the fundamentals for the company

The individual stock page has the following features:

- Displays the ticker, name, sector, and current stock price for the company in the top headings
- Also displays fourteen important financial metrics, including amongst others:
  - YTD returns compared to the S&P 500
  - Returns on Assets
  - Revenue per Share

## Notable Dependencies and APIs

This application heavily relies on the Finnhub API. It is designed assuming that the user has the free subscription tier, which limits API usage to 60 requests per second.

## Installation and Setup

Note this assumes that you already have a Finnhub API key and Docker installed. To install, follow these steps:

1. In the directory you want the application to run from, run "git clone https://github.com/csj606/nasdaq-display"
2. In the Server directory in the nasdaq-display directory, create an .env file.
3. For the .env file, add FINNHUB_API_KEY and PORT as environmental variables and set them to your API key and 4266 respectively.
4. In the nasdaq-display directory, run the command "docker compose up"

The application should now be running and available on your local machine at http://localhost:4173.

## Stack

- Frontend: TypeScript + React
- Backend: Node.js + Express.js
- Tests: Playwright

The application also have a CI/CD pipeline set up using GitHub Actions and is containerized using Docker.

## Known Issues

None to date

## Roadmap

The website is in its MVP (minimum viable product) form. For now, I've focused on functionality and the infrastructure portion of the application. While development is paused at the moment, I will return to work on the following things:

1. Improve the UI/UX of the web application using TailwindCSS
2. Improve error handling of the application
3. Provide a search function and a refresh button
4. Include SEO tags
5. Increase test coverage, including unit tests and expanded E2E coverage
