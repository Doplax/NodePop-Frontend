# NodePop Frontend

React 18 SPA for the NodePop / Wallapop clone. Talks to the `NodePop-Backend`
REST API over HTTPS / multipart for image uploads.

## Setup

```sh
npm install
cp .env.example .env
# Edit .env: VITE_REACT_APP_API_BASE_URL=http://localhost:4500
npm run dev
```

## Scripts

| Script           | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Vite dev server                              |
| `npm run build`  | Type-check (`tsc`) and build production app  |
| `npm run preview`| Preview the production build locally         |
| `npm run lint`   | ESLint (warnings fail the run)               |

## Routes

| Path                  | Auth required | Description                          |
| --------------------- | ------------- | ------------------------------------ |
| `/login`              | No            | Login form                           |
| `/adverts`            | No            | Paginated list with search + filters |
| `/adverts/:id`        | No            | Product detail (delete needs auth)   |
| `/adverts/new`        | Yes           | Create a new product (multipart)     |
| `/404`                | No            | Not found page                       |

## Architecture notes

- **API client** (`src/api/client.ts`): single Axios instance with token storage.
  Listens to `auth:unauthorized` events to surface session expiry to the React
  tree without coupling the network layer to the auth context.
- **Auth** (`src/auth/`): `AuthContextProvider` keeps the logged-in flag in
  memory and listens for 401s. `RequireAuth` guards protected routes and stashes
  the original location for a clean post-login redirect.
- **Filters** (`src/filters/`): search and tag are kept in `FiltersContext` and
  fed to the backend as query parameters (server-side filtering).
- **DTOs** (`src/shared/dtos/`): types and tag enum shared across pages and
  services — single source of truth for the product vocabulary.

## Tag vocabulary

The backend accepts `lifestyle`, `mobile`, `motor`, `work`. Keep
`PRODUCT_TAGS` in `src/shared/dtos/Product.dto.ts` in sync if the backend
adds new tags.
