# Smart Emergency Resource Allocation System

A full-stack academic demonstration of emergency triage and resource allocation. The application runs in simulation mode: it does not connect to live emergency services, traffic, or GPS.

## Requirements

- Node.js 20 or newer and npm
- MongoDB Community Server (optional; the app uses persistent JSON storage when MongoDB is not configured or unavailable)

## Install and run

Install dependencies in both parts of the project:

```powershell
cd server
npm install
cd ../client
npm install
```

Start the API in one terminal:

```powershell
cd server
npm run dev
```

Start the frontend in a second terminal:

```powershell
cd client
npm run dev
```

Open the Vite URL printed in the frontend terminal, normally `http://localhost:5173`. If that port is already in use, Vite will print a different port. The frontend proxies `/api` requests to the Express server at `http://localhost:4000`.

MongoDB is optional. To use it, set `MONGO_URI` before starting the API, for example:

```powershell
$env:MONGO_URI="mongodb://127.0.0.1:27017/smart_emergency"
npm run dev
```

Without a reachable MongoDB connection, the API stores records in `server/data.json` and reports `json` storage from `/api/health`. The JSON file is generated locally and is not included in the repository.

## Demo data

With the API running, use **System info > Seed demo data** in the application, or run `npm run seed` from the `server` directory. Seeding is skipped when data already exists. The seed contains seven available resources and five pending emergencies across locations A-F.

## Data structures and algorithms

These algorithms support emergency triage and resource dispatch in the application:

- **Weighted priority score:** Each emergency receives `0.5 x severity + 0.3 x urgency + 0.2 x waiting`. The score determines its priority category and ordering for allocation.
- **Binary max heap:** Pending emergencies are placed in a custom max heap so allocation can select the highest-scoring emergency first. Heap insertion and extract-max take `O(log n)`; peek takes `O(1)`. Ties during allocation favor the emergency registered earlier.
- **Weighted graph and Dijkstra's shortest-path algorithm:** The six locations are graph vertices and the roads between them are weighted edges. Dijkstra uses an adjacency list and a custom binary min heap to find the lowest-distance route between a resource station and an emergency. The implementation is `O((V + E) log V)` for this simple graph, where `V` is the number of locations and `E` is the number of roads.
- **Greedy allocation:** The dispatcher processes emergencies from highest to lowest priority. For each one, it considers available resources of the matching type, calculates routes, and assigns the closest unit. It marks the emergency and resource allocated before considering the next request. This is a fast heuristic; it does not guarantee the globally optimal assignment for all emergencies together.

## API

The Express REST API is under `/api`. It includes emergency registration and management, resources, allocations, dashboard data, algorithm endpoints, the map, health status, and demo-data seeding. `POST /api/emergencies` registers an emergency; `GET /api/algorithms/priority-queue` returns pending requests; `POST /api/algorithms/shortest-path` calculates a route.

## Limitations

- The road network, distances, and six locations are simulated. There is no live geocoding, traffic, or location telemetry.
- JSON storage is intended for a single local demo process. MongoDB is recommended for multi-user deployments.
- This academic demo has no authentication, authorization, audit-grade transactions, or production dispatch integration.
- Reports use all stored records; date and category filtering is not implemented.
