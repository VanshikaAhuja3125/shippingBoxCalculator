# Shipping Box Calculator

A React application for calculating shipping costs for boxes to specific locations worldwide from India. Built following MVC (Model-View-Controller) architecture pattern with state management using Context API.

## 📋 Features

- **Add Shipping Boxes**: Form to capture box details (receiver name, weight, color, destination country)
- **View All Boxes**: Table displaying all boxes with calculated shipping costs
- **Real-time Validation**: Form validation with error messages
- **Color Display**: Visual color boxes with RGB format display
- **Responsive Design**: Works seamlessly across all devices
- **Data Persistence**: Uses localStorage to simulate backend storage

## 🏗️ Architecture (MVC Pattern)

This application follows MVC (Model-View-Controller) design pattern:

### **Model Layer** (Business Logic & Data)
- **`src/utils/constants.js`**: Stores country multipliers and configuration data
- **`src/services/shippingService.js`**: Contains business logic for:
  - Shipping cost calculation (weight × country multiplier)
  - Color conversion (hex to RGB format)
  - Currency formatting

### **View Layer** (UI Components)
- **`src/components/Navbar/`**: Navigation bar with routing
- **`src/components/BoxForm/`**: Form to add new shipping boxes
- **`src/components/BoxTable/`**: Table displaying all boxes

### **Controller Layer** (State Management)
- **`src/context/BoxContext.jsx`**: Manages global state using Context API
  - Stores boxes array
  - Provides `addBox()` and `getBoxes()` functions
  - Handles localStorage persistence

## 🛠️ Tech Stack

- **React 19.2.0**: Frontend framework
- **React Router DOM 7.9.6**: Client-side routing
- **Vite**: Build tool and dev server
- **CSS Modules**: Scoped component styling
- **Context API**: State management (no Redux needed for this scope)

## 📁 Project Structure

```
src/
├── components/          # View Layer - UI Components
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.css
│   ├── BoxForm/
│   │   ├── BoxForm.jsx
│   │   └── BoxForm.module.css
│   └── BoxTable/
│       ├── BoxTable.jsx
│       └── BoxTable.module.css
├── context/            # Controller Layer - State Management
│   └── BoxContext.jsx
├── services/            # Model Layer - Business Logic
│   └── shippingService.js
├── utils/              # Model Layer - Constants & Helpers
│   └── constants.js
├── App.jsx             # Root component with routing
├── App.css             # Global app styles
├── main.jsx            # Application entry point
└── index.css           # Global reset styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/VanshikaAhuja3125/shippingBoxCalculator.git
   cd shipping-box-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will be available at `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📝 Step-by-Step Build Process

### Step 1: Project Setup
- Created folder structure following MVC pattern
- Set up constants file with country multipliers
- Created shipping service for business logic

### Step 2: State Management (Context API)
- Created `BoxContext.jsx` for global state management
- Implemented localStorage persistence
- Added `addBox()` and `getBoxes()` functions

### Step 3: Navigation Setup
- Created `Navbar` component with React Router
- Set up routing between Form and Table views
- Configured active link highlighting

### Step 4: Form Component
- Built `BoxForm` with 4 input fields:
  - Receiver Name (text input)
  - Weight (number input with validation)
  - Box Color (color picker with RGB display)
  - Destination Country (dropdown)
- Implemented validation:
  - Required field checks
  - Negative weight handling (defaults to 0)
  - Real-time error messages

### Step 5: Table Component
- Created `BoxTable` to display all boxes
- Implemented 5 columns:
  - Receiver Name
  - Weight (kg)
  - Box Colour (visual color box + RGB text)
  - Destination Country
  - Shipping Cost (INR format)
- Added empty state handling
- Made it responsive

### Step 6: Styling & Responsiveness
- Used CSS Modules for scoped styling
- Implemented responsive design for mobile devices
- Added hover effects and visual feedback

## 🎯 Key Features Explained

### Shipping Cost Calculation
- **Formula**: `Weight (kg) × Country Multiplier (INR per kg)`
- **Example**: 5 kg box to Sweden = 5 × 7.35 = ₹36.75

### Country Multipliers
- Sweden: 7.35 INR per kg
- China: 11.53 INR per kg
- Brazil: 15.63 INR per kg
- Australia: 50.09 INR per kg

### Color Format
- Color picker returns hex format (e.g., `#ffffff`)
- Converted to RGB string format: `"255, 255, 255"`
- Displayed as visual color box with RGB text

### Validation Rules
1. **Required Fields**: All fields must be filled
2. **Negative Weight**: Automatically defaults to 0 with error message
3. **Real-time Feedback**: Errors shown immediately

## 🔧 Environment Variables

Create a `.env` file in the root directory (optional):

```env
VITE_APP_NAME=Shipping Box Calculator
VITE_CURRENCY=INR
```

## 📱 Responsive Design

The application is fully responsive:
- **Desktop**: Full-width layout with centered content
- **Tablet**: Adjusted padding and font sizes
- **Mobile**: Stacked layout, optimized table display

