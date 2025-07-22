# InvestCloud Advisor Dashboard

A modern Angular 20 financial advisor dashboard application built with Spartan UI components and Tailwind CSS. This application provides comprehensive portfolio management tools including client relationships, account management, market analysis, and financial insights.

## Features

- **Dashboard Overview**: Real-time market data, portfolio summary, and quick access to key metrics
- **Client Management**: Comprehensive client and relationship tracking with detailed account information
- **Data Visualization**: Interactive charts for market analysis and portfolio performance
- **Advanced Data Tables**: Sortable, filterable tables with pagination for managing large datasets
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface using Spartan UI component library

## Tech Stack

- **Frontend Framework**: Angular 20.1.0
- **UI Components**: Spartan UI (built on Angular CDK)
- **Styling**: Tailwind CSS 3.x
- **Icons**: Lucide Icons via ng-icon
- **Charts**: Chart.js for data visualization
- **Font**: Red Hat Text (variable weight 300-700)

## Prerequisites

- Node.js 18+ 
- npm (Node Package Manager)
- Angular CLI 20.1.1

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd investcloud-advisor
```

2. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.

## Building for Production

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/investcloud-advisor` directory.

## Deployment to Netlify

This project is configured for easy deployment to Netlify:

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set the build command: `npm run build`
4. Set the publish directory: `dist/investcloud-advisor/browser`
5. Deploy!

The application includes proper routing configuration for single-page application deployment.

## Project Structure

```
src/
├── app/
│   ├── core/              # Singleton services, guards, interceptors
│   ├── features/          # Feature modules (dashboard, etc.)
│   ├── shared/            # Shared components, directives, pipes
│   │   ├── components/    # Reusable components
│   │   ├── styles/        # Global style overrides  
│   │   └── ui/            # Spartan UI component imports
│   ├── app.config.ts      # Application configuration
│   ├── app.routes.ts      # Application routing
│   └── app.ts             # Root component
├── assets/                # Static assets
├── styles.scss            # Global styles
└── index.html            # Main HTML file
```

## Key Components

### Dashboard
- Market summary cards with real-time data
- Market movers widget showing top gainers/losers
- Featured content with financial insights
- Quick links for common actions

### Accounts Widget
Multi-tab interface for managing:
- **Relationships**: Client relationship overview with account counts and balances
- **Accounts**: Individual account details with performance metrics
- **Account Groups**: Grouped account management
- **Clients**: Client listing with quick actions

### Data Tables
Reusable data table component featuring:
- Column sorting and filtering
- Pagination with customizable page sizes
- Custom cell renderers (currency, percentage, actions)
- Responsive design

## Design System

- **Primary Color**: #6a3460 (purple)
- **Typography**: Red Hat Text font family
- **Spacing**: 8px grid system
- **Cards**: White background with subtle shadow (0px 2px 6px 1px rgba(0, 0, 0, 0.03))
- **Buttons**: 37px standard height, 5px border radius

## Code Quality

The project follows Angular best practices:
- Standalone components (no NgModules)
- OnPush change detection strategy where applicable
- Proper RxJS subscription management
- TypeScript strict mode enabled
- Tailwind-first styling approach

## Testing

Run unit tests:
```bash
npm test
```

## Contributing

1. Follow the existing code style and patterns
2. Use Spartan UI components before creating custom solutions
3. Prefer Tailwind utility classes over custom CSS
4. Ensure all TypeScript has proper types
5. Test your changes thoroughly

## License

[Your License Here]

## Support

For questions or issues, please contact the development team or create an issue in the repository.