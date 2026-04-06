# Milestone Completed: Admin Portal Integration

The `admin-portal` has been thoroughly revamped. The static mock-ups have been entirely replaced with active **Appwrite TanStack Query bindings**, and the dashboard now genuinely interacts with the underlying Cloud database to manage verification workflows securely.

## 1. Locked Gateway Architecture (`middleware.ts`)
The entire `http://localhost:4003` domain has been forced behind a Next.js Edge Middleware wall. No public user can arbitrarily query Admin APIs.
*   **The Mock Bypasser:** To proceed with testing, navigating to `localhost:4003` will instantly redirect you to `/login`. Use the static credentials (`itadmin` / `support`) as requested.
*   Next.js securely generates an HTTP Only `admin_auth` cookie valid for 24 hours, safely permitting access across the UI.

## 2. Serverless Operations APIs (`ProcessOrder`)
The heavy lifting (Approve / Reject logic) was intentionally built inside the Next.js `route.ts` API boundary (`/api/admin/orders/[orderNo]/process`), so the browser UI never actively needs the Appwrite API Keys.

### When hitting [Approve]:
1. The admin fetches the target Order.
2. The server marks `status = 'paid'`.
3. The server natively enumerates over the `order_items`.
4. It dynamically generates explicit Database `Tickets` payloads mapping `QR Code Data` explicitly to `ticketNo` hashes (`TIC-xxxxx`), preparing the user's mobile screen to suddenly shift from "Bank Slip Required" to a confirmed E-Ticket view.

### When hitting [Reject]:
1. The Order is immediately marked `cancelled` with `cancelledAt` logged.
2. The server natively enumerates over the original `order_items`.
3. The original inventory payload strictly maps against the `items` collection and mathematically restores `remainingQty`, preventing fake slips from hogging festival capacity.

## 3. Real-Time View UI (`page.tsx`)
The dashboard now visually utilizes the TanStack Query layer injected by `@soulfest/ui-core`.
*   It accurately pulls financial aggregates (Total Verified Sales, Tickets Issued, Pending Queues) dynamically utilizing strict Status queries from Appwrite `orders`.
*   Hovering over "View Receipt" physically bridges into the Appwrite Storage `getFileView` API, safely pulling out the guest's uploaded proof of payment seamlessly.
*   Pressing Actions manually flashes the entire dataset back into sync utilizing `queryClient.invalidateQueries`.

> [!TIP]
> If you start both your `npm run dev:ticketing` and `npm run dev:admin` instances side-by-side, you can explicitly track the full Phase 4 lifecycle: Checkout as a Guest &rarr; Order appears on Admin Queue &rarr; Press Approve &rarr; Mobile checkout instantly updates to "Paid" via Session matching.
