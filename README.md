# Raj Restaurant - Premium Food Ordering Platform

A modern, responsive food ordering frontend application built with Next.js, React, and Framer Motion. Features full Razorpay payment integration, interactive menu browsing, table booking, and contact management.

## Features

### Core Pages
- **Home**: Landing page with hero section, features, and CTAs
- **Menu**: Searchable menu with category filters, 15+ premium Indian dishes
- **Cart**: Full-featured shopping cart with quantity management
- **Checkout**: Razorpay payment integration with delivery details
- **Order Success**: Order confirmation page with tracking info
- **Book Table**: Table reservation form with date/time selection
- **Contact**: Contact form and business information

### Key Features
✅ **Shopping Cart Management** - Add/remove items, update quantities, persist to localStorage  
✅ **Razorpay Integration** - Complete checkout flow with payment gateway  
✅ **Smooth Animations** - Framer Motion animations throughout the app  
✅ **Responsive Design** - Mobile-first, works on all screen sizes  
✅ **Search & Filter** - Find dishes by name or filter by category  
✅ **Menu Management** - 15 premium Indian dishes with images, ratings, prices  
✅ **Premium Dark Theme** - Red/black/white color scheme with glassmorphism  
✅ **State Management** - Zustand store for cart with localStorage sync  

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **State**: Zustand
- **Forms**: React Hook Form
- **Payment**: Razorpay
- **Icons**: Lucide React
- **Images**: Next.js Image component

## Project Structure

```
app/
├── page.tsx              # Landing/Home page
├── menu/                 # Menu browsing
├── cart/                 # Shopping cart
├── checkout/             # Razorpay checkout
├── order-success/        # Order confirmation
├── bookings/             # Table booking
├── contact/              # Contact page
└── layout.tsx            # Root layout with header

components/
├── header.tsx            # Navigation header
├── menu-card.tsx         # Individual menu item card
├── checkout-razorpay.tsx # Razorpay payment component
├── hero-slider.tsx       # Legacy: Hero image slider
└── food-menu.tsx         # Legacy: Food menu section

lib/
├── cart-store.ts         # Zustand cart store
├── menu-data.ts          # Menu items and categories
└── utils.ts              # Utility functions
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- pnpm (preferred) or npm/yarn

### Steps

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Run Development Server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
   ```bash
   pnpm build
   pnpm start
   ```

## Component Breakdown

### Header (`components/header.tsx`)
- Sticky navigation bar with logo and menu links
- Responsive mobile menu with hamburger icon
- Cart button with item counter badge
- Links to all major pages

### Menu Card (`components/menu-card.tsx`)
- Individual dish card with image, name, description
- Rating, prep time, price display
- Veg/Non-veg indicators with color coding
- Popular/Limited badges
- Add to cart button with animations

### Checkout Razorpay (`components/checkout-razorpay.tsx`)
- Order summary with itemized list
- Delivery form (name, phone, address)
- Real-time total calculation with tax & delivery
- Razorpay payment modal integration
- Success/failure status handling
- Order ID display and confirmation

### Menu Page (`app/menu/page.tsx`)
- Full-width menu display with grid layout
- Search bar for dish name/description search
- Category filter buttons (All, Appetizers, Curries, etc.)
- 15 premium menu items with images
- Smooth animations on card appearance

### Cart Page (`app/cart/page.tsx`)
- Item list with images and quantities
- Increment/decrement quantity controls
- Remove item functionality
- Order summary sidebar
- Proceed to checkout button
- Empty cart state with browse menu CTA

## State Management

### Zustand Cart Store
The cart state is managed using Zustand with localStorage persistence:

```typescript
// Add item to cart
useCartStore.getState().addItem({ id, name, price, quantity, image, category })

// Remove item
useCartStore.getState().removeItem(id)

// Update quantity
useCartStore.getState().updateQuantity(id, newQuantity)

// Get totals
const total = useCartStore.getState().getTotalPrice()
const count = useCartStore.getState().getTotalItems()
```

## Razorpay Integration

The checkout component includes Razorpay payment gateway integration:

- **Test Key**: `rzp_test_1DP5MMOk78GGZF` (configured in component)
- **Flow**: User enters delivery details → Click "Pay with Razorpay" → Payment modal opens → Process payment
- **Success**: Clears cart, displays confirmation, redirects to order-success page
- **Failure**: Shows error message, allows retry

### For Production
Replace the test key with your production Razorpay API key in `components/checkout-razorpay.tsx`.

## Menu Items

The app includes 15 premium Indian dishes across multiple categories:

**Curries**: Butter Chicken, Chicken Tikka Masala, Dal Makhani, Malai Kofta, Fish Curry  
**Rice**: Biryani (Chicken, Vegetable), Prawn Biryani  
**Grills**: Tandoori Chicken, Paneer Tikka  
**Breads**: Naan, Garlic Naan  
**Desserts**: Gulab Jamun, Ras Malai  
**Beverages**: Mango Lassi  

Each item includes: name, description, price, rating, prep time, veg/non-veg indicator, image.

## Design System

### Colors
- **Primary**: Red (#DC2626, #991B1B, #7F1D1D)
- **Neutral**: Black (#000000), Gray (#111827, #1F2937, #4B5563)
- **Accents**: Yellow (#FBBF24), Green (#16A34A)

### Typography
- **Headings**: Geist (default font)
- **Body**: Geist Sans

### Spacing & Layout
- Mobile-first responsive design
- Flexbox for most layouts, Grid for menu
- Glassmorphism effects with backdrop blur
- Smooth Framer Motion animations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Image optimization with Next.js Image
- Dynamic imports for page components
- Tailwind CSS purging unused styles
- LocalStorage for cart persistence
- Smooth scroll behavior

## Future Enhancements

- User authentication & profiles
- Order history & tracking
- Favorites/Wishlist
- Multiple delivery addresses
- Payment method options
- Real-time order status updates
- Admin dashboard
- Reviews & ratings
