# Conway's Game of Life

A modern, interactive browser implementation of Conway's Game of Life built with React, TypeScript, and Vite. This project provides a beautiful, responsive interface for exploring cellular automata patterns and behaviors.

![Game of Life Demo](public/life-favicon.png)

## 🎮 Features

- **Interactive Grid**: Click to toggle cells on/off with real-time visual feedback
- **Simulation Controls**: Start, stop, reset, and clear the grid
- **Adjustable Speed**: Control simulation speed with a slider (50ms - 5000ms)
- **Grid Persistence**: Save and load custom grid patterns with custom names
- **UI**: Built with Tailwind CSS and Radix UI components

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Shinlun/life-game.git
cd life-game
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Play

### Basic Controls

- **Click cells** to toggle them alive/dead
- **Start/Stop** button to control simulation
- **Reset** to return to the last saved state
- **Clear** to empty the entire grid
- **Speed slider** to adjust simulation speed

### Saving and Loading

- **Save Grid**: Click the save button to store the current pattern
- **Load Grid**: Select from saved patterns in the dropdown
- **Delete Grid**: Remove unwanted saved patterns

### Game Rules

Conway's Game of Life follows these simple rules:

1. **Birth**: A dead cell with exactly 3 live neighbors becomes alive
2. **Survival**: A live cell with 2 or 3 live neighbors stays alive
3. **Death**: A live cell with fewer than 2 or more than 3 neighbors dies

## 🛠️ Technical Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Context API
- **Local Storage**: Custom hook for persistence
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── layouts/          # Layout components
│   ├── molecules/        # Small reusable components
│   ├── organisms/        # Complex components
│   └── ui/              # Base UI components
├── contexts/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and game logic
└── assets/             # Static assets
```

## 🎨 Key Components

- **Grid**: Main game board with interactive cells
- **Menu**: Control panel with simulation controls
- **SaveGridForm**: Interface for saving grid patterns
- **LoadGridForm**: Interface for loading saved patterns
- **Cell**: Individual grid cell component

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

This project uses:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Atomic Design principles for component organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- John Conway for creating the Game of Life
- The React and Vite communities for excellent tooling
- Radix UI for accessible component primitives
- Tailwind CSS for the utility-first styling approach
- AI for generating this README file :robot:

---

**Enjoy exploring the fascinating world of cellular automata!** 🧬
