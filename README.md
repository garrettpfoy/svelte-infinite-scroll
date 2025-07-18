# Infinite Scroll + Data Loading Demo

A modern infinite scroll implementation built with SvelteKit that demonstrates seamless data loading and user experience patterns.

🚀 **Live Demo**: [https://infinite-scroll.cybernaut.app/](https://infinite-scroll.cybernaut.app/)

## Features

- **Infinite Scroll**: Automatically loads more content as users scroll
- **Intersection Observer**: Efficient scroll detection using modern browser APIs
- **Loading States**: Visual feedback during data fetching
- **Form Actions**: Server-side data fetching with SvelteKit actions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Built-in theme switching
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: SvelteKit
- **Styling**: TailwindCSS with custom design system
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Deployment**: Docker-ready
- **Data Source**: DummyJSON API

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── custom/bento/         # Bento box components
│   │   └── ui/skeleton/          # Loading skeleton components
│   ├── hooks/                    # Custom Svelte hooks
│   └── utils.ts                  # Utility functions
├── routes/
│   ├── +layout.svelte           # App layout
│   ├── +page.svelte             # Main page
│   └── +page.server.ts          # Server actions
└── types/
    └── post.ts                  # TypeScript interfaces
```

## Key Components

### BentoBox
The main infinite scroll container that:
- Manages the list of items
- Handles intersection observer setup
- Triggers data loading when sentinel comes into view
- Provides loading states and error handling

### Bento
Individual item component featuring:
- Modern card-based design
- Skeleton loading states
- Dark mode support
- Responsive layout

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd infinite-scroll-demo
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
pnpm build
```

### Docker Deployment (Recommended)

The project includes a multi-stage Dockerfile for production deployment:

```bash
# Run the container
docker run -p 3000:3000 ghcr.io/garrettpfoy/infinite-scroll-demo:latest
```

## How It Works

1. **Initial Load**: The app fetches the first batch of posts on mount
2. **Scroll Detection**: An Intersection Observer watches a sentinel element at the bottom
3. **Data Fetching**: When the sentinel becomes visible, a server action fetches more posts
4. **State Management**: New posts are appended to the existing list using Svelte's reactive state
5. **Loading States**: Skeleton components provide visual feedback during loading

## Configuration

Key configuration options in `+page.svelte`:

```typescript
let limit = $state(10);        // Initial posts to load
let increment = 3;             // Posts to load on each scroll
let offset = $state(0);        // Current offset for pagination
```

## API Integration

The demo uses the DummyJSON API for sample data. The server action in `+page.server.ts` handles:
- Parameter validation
- API requests
- Error handling
- Data transformation

## Performance Considerations

- **Intersection Observer**: More efficient than scroll event listeners
- **Skeleton Loading**: Prevents layout shift during loading
- **Efficient State Updates**: Uses Svelte's reactive patterns
- **TypeScript**: Compile-time error checking

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Sample data from [DummyJSON](https://dummyjson.com/)
- Components from [ShadCN-Svelte](https://shadcn-svelte.com)

---
