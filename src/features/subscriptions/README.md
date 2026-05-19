# Feature: subscriptions

Manages the subscription UI — pricing page, Stripe Checkout redirect, payment success confirmation, and the paywall banner shown to free users on pro-only content.

---

## Responsibilities

- Display pricing tiers and a CTA to subscribe
- Initiate a Stripe Checkout session via the backend
- Show a confirmation page after successful payment
- Render a `PaywallBanner` component on pages behind the pro paywall

---

## Structure

```
subscriptions/
  api/
    subscriptionsApi.ts         # GET /api/subscriptions/me, POST /api/subscriptions/create-checkout-session
  components/
    PaywallBanner.tsx           # Shown when a pro route is accessed without a subscription
  hooks/
    useSubscription.ts          # TanStack Query: GET /api/subscriptions/me
  pages/
    PricingPage.tsx             # Pricing tiers + subscribe button
    PaymentSuccessPage.tsx      # Post-checkout confirmation
```

---

## Pages & Routes

| Path | Component | Description |
|---|---|---|
| `/pricing` | `PricingPage` | Pricing tiers, CTA to subscribe |
| `/payment/success` | `PaymentSuccessPage` | Stripe redirects here after successful checkout |

---

## Checkout Flow

```
User clicks "Subscribe"
  → POST /api/subscriptions/create-checkout-session
  → Backend creates Stripe Checkout session
  → Frontend redirects to Stripe-hosted checkout URL
  → After payment, Stripe redirects to /payment/success
  → Webhook (backend) updates subscription record
```

---

## PaywallBanner

`PaywallBanner` is rendered by any page or component that is pro-only (exercises, theory interactions). It shows the plan benefits and a link to `/pricing`. The banner is hidden if `useSubscription()` returns an active plan.

---

## Subscription State

`useSubscription()` fetches `GET /api/subscriptions/me`. The result includes the current plan (`free` / `pro`) and expiry date. This is used globally by paywall-gated components to decide whether to show content or the banner.
