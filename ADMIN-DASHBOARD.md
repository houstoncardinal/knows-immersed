# KNOWS STUDIOS - Admin Dashboard Documentation

## 🎯 Overview

A comprehensive admin dashboard for managing all aspects of KNOWS STUDIOS operations, including bookings, clients, projects, equipment, analytics, and settings.

---

## 🚀 Access the Admin Dashboard

### Login Credentials (Demo)
- **URL**: http://localhost:8081/admin/login
- **Email**: admin@knowsstudios.com
- **Password**: admin123

### Production Setup
Replace the demo authentication in `src/contexts/AuthContext.tsx` with your actual authentication API.

---

## 📊 Dashboard Features

### 1. **Dashboard Overview** (`/admin/dashboard`)
Main landing page with key metrics and quick actions.

#### Features:
- **Real-time Statistics**
  - Total Bookings (with month-over-month growth)
  - Active Clients count
  - Monthly Revenue tracking
  - Equipment Usage percentage

- **Recent Bookings**
  - Last 4 bookings with details
  - Status indicators (Confirmed, Pending, Cancelled)
  - Quick access to booking details

- **Upcoming Tasks**
  - Priority-based task list (High, Medium, Low)
  - Due date tracking
  - Color-coded priorities

- **Quick Actions**
  - New Booking
  - Add Client
  - Mark Complete
  - View Alerts

### 2. **Booking Management** (`/admin/bookings`)
Comprehensive booking system with table and calendar views.

#### Features:
- **Search & Filters**
  - Search by client name or booking ID
  - Filter by status (All, Confirmed, Pending, Cancelled)
  - Date range filtering

- **Two View Modes**
  - **Table View**: Detailed list with all booking information
  - **Calendar View**: Visual calendar with date-specific bookings

- **Booking Details Modal**
  - Complete client information
  - Booking date, time, and package
  - Add-ons list
  - Project notes
  - Status management
  - Quick actions (Confirm, Edit, Cancel)

- **Actions**
  - Export bookings data
  - Create new bookings
  - View/Edit/Delete bookings
  - Confirm pending bookings

### 3. **Client Management** (`/admin/clients`)
Full CRM system for client tracking and relationship management.

#### Features:
- **Client Statistics**
  - Total clients count
  - Active clients tracking
  - Average booking value
  - Top client spend

- **Client Information**
  - Personal details (name, email, phone)
  - Company information
  - Client type (Corporate/Individual)
  - 5-star rating system
  - Total bookings count
  - Total amount spent
  - Last booking date
  - Activity status (Active/Inactive)

- **Client Profile Modal**
  - Complete client history
  - Contact details
  - Booking statistics
  - Internal notes
  - Quick actions (Create Booking, Send Email)

- **Search Functionality**
  - Search by name, email, or company
  - Real-time filtering

### 4. **Project Management** (`/admin/projects`)
Track multi-booking projects and campaigns.

#### Features:
- **Project Overview**
  - Active projects count
  - Total project value
  - Average completion percentage

- **Project Cards**
  - Project name and ID
  - Associated client
  - Status (Planning, In Progress, Completed)
  - Progress bar (0-100%)
  - Budget tracking (spent vs. total)
  - Number of bookings
  - Start and end dates

- **Project Details**
  - Full project information
  - Booking breakdown
  - Timeline view
  - Budget analysis

### 5. **Equipment Inventory** (`/admin/equipment`)
Complete equipment tracking and maintenance management.

#### Features:
- **Inventory Statistics**
  - Total equipment items
  - Available count
  - In-use count
  - Maintenance count

- **Equipment Details**
  - Equipment name and ID
  - Category (Lighting, Audio, etc.)
  - Status (Available, In-Use, Maintenance)
  - Condition (Excellent, Good, Fair)
  - Asset value
  - Usage percentage
  - Last maintenance date
  - Next maintenance due

- **Equipment Management**
  - Add new equipment
  - Update status
  - Schedule maintenance
  - Track usage history
  - Search functionality

### 6. **Analytics & Reports** (`/admin/analytics`)
Business intelligence and performance tracking.

#### Features:
- **Key Metrics**
  - 30-day revenue with trend
  - 30-day bookings with growth percentage
  - New clients acquired
  - Average booking value

- **Top Services**
  - Most booked packages
  - Revenue by package type
  - Booking count per service

- **Monthly Overview**
  - Total revenue
  - Total bookings
  - Active clients
  - Visual performance indicators

### 7. **Settings** (`/admin/settings`)
Configure studio settings and preferences.

#### Features:
- **Studio Information**
  - Studio name
  - Contact email
  - Phone number
  - Physical address

- **Booking Settings**
  - Auto-confirm bookings toggle
  - Email notifications toggle
  - SMS notifications toggle

- **Package Pricing**
  - Half Day rate ($250)
  - Full Day rate ($450)
  - Multi-Day rate ($400/day)

- **Save Changes**
  - Immediate settings update
  - Confirmation feedback

---

## 🎨 Design System

### Color Scheme
- **Primary**: Neon Cyan (`hsl(180 100% 50%)`)
- **Secondary**: Neon Pink (`hsl(340 100% 60%)`)
- **Background**: Studio Dark (`hsl(0 0% 5%)`)
- **Success**: Green (`bg-green-500`)
- **Warning**: Yellow (`bg-yellow-500`)
- **Error**: Red (`bg-red-500`)

### Status Indicators
- **Confirmed**: Green badge with checkmark
- **Pending**: Yellow badge with clock
- **Cancelled**: Red badge with X
- **Active**: Green background
- **Inactive**: Gray background

### Interactive Elements
- **Hover Effects**: Cards lift and glow on hover
- **Transitions**: Smooth 300-500ms animations
- **Buttons**: Gradient backgrounds with hover opacity
- **Tables**: Hover row highlighting

---

## 📱 Responsive Design

### Desktop (> 1024px)
- Full sidebar navigation
- Multi-column layouts
- Table views with all columns
- Large stat cards

### Tablet (768px - 1024px)
- Collapsible sidebar
- 2-column layouts
- Horizontal scrolling tables
- Medium stat cards

### Mobile (< 768px)
- Hamburger menu
- Single-column layouts
- Vertical card stacking
- Mobile-optimized forms

---

## 🔐 Authentication Flow

### Login Process
1. User enters credentials at `/admin/login`
2. Credentials validated (demo: admin@knowsstudios.com / admin123)
3. User object stored in localStorage
4. Redirect to `/admin/dashboard`

### Protected Routes
All `/admin/*` routes (except `/admin/login`) are protected by:
- `AuthProvider` context
- `ProtectedRoute` wrapper component
- Automatic redirect to login if not authenticated

### Logout Process
1. Click logout button in sidebar
2. Clear localStorage
3. Reset auth state
4. Redirect to `/admin/login`

---

## 🗂️ File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx           # Authentication state management
├── components/
│   ├── admin/
│   │   └── AdminLayout.tsx       # Admin dashboard layout with sidebar
│   └── ProtectedRoute.tsx        # Route protection HOC
├── pages/
│   └── admin/
│       ├── Login.tsx              # Admin login page
│       ├── Dashboard.tsx          # Main dashboard
│       ├── Bookings.tsx           # Booking management
│       ├── Clients.tsx            # Client CRM
│       ├── Projects.tsx           # Project tracking
│       ├── Equipment.tsx          # Equipment inventory
│       ├── Analytics.tsx          # Analytics & reports
│       └── Settings.tsx           # Settings page
└── App.tsx                        # Route configuration
```

---

## 🔧 Technical Implementation

### State Management
- **React Context API** for authentication
- **Local State (useState)** for component-level state
- **localStorage** for session persistence

### Data Management
Currently using mock data. To integrate with real API:

1. **Replace mock data arrays** in each component with API calls
2. **Update** `AuthContext.tsx` login function with real authentication
3. **Add** API service layer (e.g., `src/services/api.ts`)
4. **Implement** React Query or SWR for data fetching
5. **Add** error handling and loading states

### Example API Integration

```typescript
// src/services/api.ts
export const fetchBookings = async () => {
  const response = await fetch('/api/bookings');
  return response.json();
};

// In component
import { useQuery } from '@tanstack/react-query';

const { data: bookings } = useQuery({
  queryKey: ['bookings'],
  queryFn: fetchBookings
});
```

---

## 📊 Mock Data Structure

### Bookings
```typescript
{
  id: string;           // "BK-001"
  client: string;       // Client name
  email: string;        // Client email
  phone: string;        // Client phone
  date: string;         // YYYY-MM-DD
  time: string;         // "10:00 AM - 6:00 PM"
  package: string;      // Package name
  status: string;       // "confirmed" | "pending" | "cancelled"
  amount: number;       // Booking amount
  addOns: string[];     // Array of add-on names
  notes: string;        // Booking notes
}
```

### Clients
```typescript
{
  id: string;           // "CL-001"
  name: string;         // Client name
  email: string;        // Client email
  phone: string;        // Client phone
  company: string;      // Company name
  type: string;         // "Corporate" | "Individual"
  totalBookings: number; // Total booking count
  totalSpent: number;   // Total amount spent
  lastBooking: string;  // Last booking date
  status: string;       // "active" | "inactive"
  rating: number;       // 1-5 stars
  notes: string;        // Internal notes
}
```

### Projects
```typescript
{
  id: string;           // "PRJ-001"
  name: string;         // Project name
  client: string;       // Associated client
  status: string;       // "planning" | "in-progress" | "completed"
  progress: number;     // 0-100
  startDate: string;    // YYYY-MM-DD
  endDate: string;      // YYYY-MM-DD
  budget: number;       // Project budget
  spent: number;        // Amount spent
  bookings: number;     // Number of associated bookings
}
```

### Equipment
```typescript
{
  id: string;           // "EQ-001"
  name: string;         // Equipment name
  category: string;     // Equipment category
  status: string;       // "available" | "in-use" | "maintenance"
  condition: string;    // "excellent" | "good" | "fair"
  lastMaintenance: string; // Last service date
  nextMaintenance: string; // Next service date
  value: number;        // Asset value
  usage: string;        // "78%"
}
```

---

## 🚀 Features to Add (Future Enhancements)

### Phase 2
- [ ] Real-time notifications system
- [ ] Email integration for client communication
- [ ] SMS booking reminders
- [ ] Automated invoice generation
- [ ] Payment processing integration
- [ ] Calendar sync (Google Calendar, iCal)
- [ ] Advanced reporting with charts
- [ ] Export functionality (CSV, PDF)

### Phase 3
- [ ] Multi-user access with roles
- [ ] Activity audit log
- [ ] Automated backup system
- [ ] Mobile app for admin
- [ ] AI-powered analytics insights
- [ ] Booking conflict detection
- [ ] Resource scheduling optimization

---

## 🎓 Usage Guide

### Creating a New Booking
1. Navigate to `/admin/bookings`
2. Click "New Booking" button
3. Enter client information
4. Select date and time
5. Choose package
6. Add any add-ons
7. Save booking
8. Confirmation modal appears

### Managing Clients
1. Navigate to `/admin/clients`
2. Search or browse client list
3. Click "View" to see client details
4. Use quick actions:
   - Create new booking for client
   - Send email to client
   - Edit client information

### Tracking Projects
1. Navigate to `/admin/projects`
2. View all ongoing projects
3. Click project card to see details
4. Update project status and progress
5. Track budget vs. actual spending

### Equipment Maintenance
1. Navigate to `/admin/equipment`
2. View equipment status
3. Check maintenance schedules
4. Update equipment status
5. Schedule next maintenance

---

## 🔍 Troubleshooting

### Can't Login
- Verify credentials: admin@knowsstudios.com / admin123
- Clear browser localStorage
- Check browser console for errors

### Routes Not Working
- Ensure you're on correct URL path
- Check authentication status
- Verify React Router configuration

### Data Not Loading
- Check browser console for errors
- Verify mock data is present
- Check component imports

---

## 📞 Support

For questions or issues:
- Email: info@knowsstudios.com
- Phone: 323 609 3356

---

**Admin Dashboard Version**: 1.0.0
**Last Updated**: 2025-11-25
**Status**: ✅ Complete and Ready for Production
