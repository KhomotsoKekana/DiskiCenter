# DiskiCenter

DiskiCenter is an open-source football platform focused on South African football. The goal of the project is to make local football information easier to access for fans, analysts, and developers.

## Project Vision

South African football content is scattered across many platforms. Fans often need to visit multiple websites to find news, transfers, fixtures, and statistics. DiskiCenter aims to bring this information into one centralized platform dedicated to local football.

The platform will focus primarily on:

* South African leagues
* Domestic competitions
* Local player data
* Transfers and rumours
* Club information
* Match fixtures and results

The project also aims to become a developer-friendly platform where contributors can help expand coverage of South African football.

## Goals

* Make South African football data more accessible
* Provide a central hub for local football news and statistics
* Highlight leagues that receive limited online coverage
* Allow developers to contribute and build new features
* Encourage community participation in improving local football data

## Competitions Covered

DiskiCenter aims to support both leagues and domestic competitions.

### Leagues

* Premier Soccer League (PSL)
* National First Division (NFD)
* ABC Motsepe League

### Domestic Competitions

* Nedbank Cup
* MTN 8
* Carling Knockout Cup

Additional regional and youth competitions may be added in the future.

## Core Features

### 1. Football News Aggregation

The platform will collect football news from multiple trusted sources and present them in one location.

Features:

* Latest South African football news
* Club-specific news filtering
* Trending football topics

### 2. Club Pages

Each club will have its own profile page containing:

* Squad list
* Latest news
* Fixtures
* Results
* Transfers
* League position

### 3. Player Profiles

Player pages will include:

* Career history
* Clubs played for
* Season statistics
* Transfer history

### 4. Transfer Tracker

Track confirmed transfers and rumours across South African leagues.

Features:

* Transfer timeline
* Rumour tracking
* Confirmed deals

### 5. Fixtures and Results

Fans will be able to view:

* Upcoming fixtures
* Match results
* Competition schedules

### 6. Live Scores (Future Goal)

One of the main challenges of the project is finding reliable APIs for live scores, especially for lower South African leagues.

Current considerations:

* Some APIs support PSL data
* NFD and ABC Motsepe live scores are difficult to obtain

Possible solutions:

* Integrate available football APIs where possible
* Explore community-driven match reporting
* Manually curated match updates

### 7. Player Comparison Tool

Allow fans to compare two players using statistics such as:

* Goals
* Assists
* Appearances
* Passing accuracy

### 8. Trending Football Data

Highlight trending players, clubs, and news stories.

## Data Sources

The project will integrate with several football data providers where possible.

Possible sources include:

* Transfermarkt (transfers and player data)
* FotMob (competitions and fixtures)

Due to limited APIs for South African football, additional solutions may be required.

## Technology Stack

The project will be built using the following technologies:

Frontend

* Angular
* Tailwind CSS

Backend

* Node.js

Database

* MySQL

Additional tools may be added as the project grows.

## Open Source Contribution

DiskiCenter is designed to eventually become an open-source community project.

Future contributors may help with:

* Expanding league coverage
* Improving football datasets
* Adding new features
* Fixing bugs
* Improving documentation

## Project Status

Currently in the planning and architecture phase.

Initial development will focus on:

1. Basic application structure
2. Competition and club pages
3. News aggregation
4. Transfer tracking

Once the core features are stable, the project will be opened for community contributions.

## Future Ideas

Possible future features include:

* Tactical match analysis
* Fan sentiment tracking
* Historical league statistics
* "Where Are They Now" player stories
* Public API for developers

## Challenges

The biggest challenge for the project is the limited availability of structured data for South African football.

Particularly difficult areas include:

* Live scores for NFD
* Coverage of ABC Motsepe League
* Consistent player statistics

Solving these challenges may require creative technical solutions and community contributions.

## Long-Term Vision

DiskiCenter aims to become one of the most accessible digital hubs for South African football information while also supporting developers who want to build tools around local football data.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
