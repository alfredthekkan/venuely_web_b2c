# Venuely Widget Development Guide

## Project Architecture

This is a **Next.js 15 booking widget** for venue reservation management using App Router, TypeScript, and Firebase Auth.

### Core Data Flow
- **Venue Selection** → **Service Selection** → **Time Slot Selection** → **Contact Details** → **Reservation**
- State flows through Context providers: `NavigationContext` → `VenueContext` → `BookingContext` → API calls

### Auto-Generated API Layer (CRITICAL)
- **All network calls** use auto-generated TypeScript client from `api.yaml`
- Run `npm run genapi` after any changes to `api.yaml` to regenerate client
- **NEVER manually edit** any files in `src/lib/api/` - they're completely overwritten
- Import pattern: `import { DefaultApi, GetVenueDetailsRequest } from '@/lib/api'`
- Call pattern: `const api = new DefaultApi(); const result = await api.methodName(requestParams)`
- All request/response types are auto-generated and fully typed

## Key Development Patterns

### Context Architecture
```tsx
// Always wrap AuthProvider inside NavigationContext
<NavigationContext.Provider value={{title, setTitle}}>  
  <Navbar/>
  <AuthProvider>
    {children}
  </AuthProvider>
</NavigationContext.Provider>
```

### Network Call Pattern (Auto-Generated)
```tsx
// ALWAYS use auto-generated API client - never fetch() or axios directly
import { DefaultApi, GetVenueDetailsRequest } from '@/lib/api';

const requestParams: GetVenueDetailsRequest = { venueId: venue_id };
const bookingApi = new DefaultApi();
const result = await bookingApi.getVenueDetails(requestParams);
// Result is fully typed based on OpenAPI spec
```

### Firebase Auth Integration
- Phone number auth only: `auth.useDeviceLanguage()` set in `firebase.ts`
- Check auth state with `useAuth()` hook from `AuthContext`
- Bearer tokens automatically handled by API client when user authenticated

### UI Development with shadcn/ui
- **All UI components** use shadcn/ui library with Radix primitives + Tailwind CSS
- Import pattern: `import { Button } from "@/components/ui/button"`
- Available components: Button, Card, Checkbox, Form, Input, Label, Skeleton, Tabs, etc.
- Custom `SafeImage` component auto-handles loading/error states (use instead of Next.js Image)
- Mobile-first responsive design with fixed bottom CTAs
- **Luxury Black & Gold theme**: `bg-brand-500 hover:bg-brand-600` (gold), `bg-brand-black text-brand-500` (black with gold text)
- **Premium gradients**: `bg-gradient-to-br from-brand-charcoal via-brand-900 to-brand-700`

### Routing Structure
```
/venue/[venue_id]           # Venue homepage
/venue/[venue_id]/booking/step1  # Service selection
/venue/[venue_id]/booking/step2  # Time slot selection  
/venue/[venue_id]/booking/step3  # Contact details
/venue/[venue_id]/booking/step4  # Confirmation
```

## Development Commands

```bash
npm run dev --turbopack    # Development with Turbopack
npm run genapi            # Regenerate API client from api.yaml
npm run build --turbopack # Production build
```

## Critical Files
- `api.yaml` - OpenAPI spec (source of truth for API)
- `src/context/BookingContext.tsx` - Booking state management
- `src/context/VenueContext.tsx` - Venue data provider
- `src/firebase.ts` - Firebase configuration and auth setup

## State Management Rules
- **BookingModel** tracks: venue_id, services[], providerId, start/end dates, guest details
- Always update contexts immutably: `{...context.booking, newField: value}`
- Navigation titles managed through `NavigationContext.setTitle()`
- Use `React.use(params)` for async route parameters in App Router

## Mobile-First Design
- Max width containers: `max-w-md` or `max-w-xs`
- Fixed bottom CTAs with backdrop blur: `bg-white/80 backdrop-blur-md`
- **Luxury card layouts**: `bg-brand-500 hover:bg-brand-600 text-brand-black` (gold buttons), `bg-brand-black text-brand-500 border-brand-500` (black containers)
- **Premium backgrounds**: `bg-gradient-to-br from-brand-charcoal via-brand-900 to-brand-700`