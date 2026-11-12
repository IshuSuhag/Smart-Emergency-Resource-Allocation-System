# Smart Emergency Resource Allocation System

A full-stack academic demonstration of emergency triage and resource allocation. The interface explicitly reports **simulation mode**: it has no live emergency-service, traffic, or GPS connection.

## Requirements

- Node.js 20 or newer and npm
- MongoDB Community Server (optional; local persistent JSON storage is used when MongoDB is not reachable)

## Install and run

From the project root, install each package set:

```powershell
cd server
npm install
cd ../client
npm install
```

In terminal 1:

```powershell
cd server
$env:MONGO_URI="mongodb://127.0.0.1:27017/smart_emergency"
npm run dev
```

If MongoDB is not installed, omit `MONGO_URI`; the API falls back to `server/data.json` and announces that mode in its log and `/api/health`.

In terminal 2:

```powershell
cd client
npm run dev
```

Open the Vite URL shown in the terminal (normally http://localhost:5173). There is no login or default credential.

## Demo data

With the API running, use **System info → Seed demo data**, or run `npm run seed` from `server`. Seeding is skipped if records already exist. The seed contains seven available resources and five pending emergencies across locations A–F.

## Algorithms

- Priority: `0.5 × severity + 0.3 × urgency + 0.2 × waiting`.
- A custom binary max heap orders pending emergencies (insert/extract O(log n), peek O(1)).
- Dijkstra uses an adjacency list and custom binary min heap (O((V+E) log V)).
- The greedy allocator processes emergencies by priority and selects the nearest currently available compatible resource. It is not globally optimal for simultaneous allocations.

## API

REST endpoints are under `/api`: emergencies, resources, allocations, dashboard, algorithms, `/map`, `/health`, and `/seed`. Vite proxies `/api` to `http://localhost:4000`.

## Limitations

- Road distances and the six-zone map are simulated. There is no real geocoding, traffic, or location telemetry.
- The JSON fallback is intended for a single local demo process. MongoDB is recommended for multi-user deployments.
- This academic demo has no authentication, authorization, audit-grade transactions, or production dispatch integration.
- Reports currently use all stored records; date/category filtering is not yet implemented.
"# Smart-Emergency-Resource-Allocation-System" 
