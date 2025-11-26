# KNOWS STUDIOS - Development Guide

## 🚀 Quick Start

### For Instant Hot Reloading (Recommended)
```bash
./dev.sh
# or
npm run dev
```
**Changes apply instantly** - no need to restart the server!

### Development Options

#### 🔥 Hot Module Replacement (Fastest)
```bash
./dev.sh          # Instant updates, no restarts needed
```

#### 🔍 With Type Checking
```bash
./dev.sh type     # HMR + real-time TypeScript checking
npm run dev:auto  # Same as above
```

#### 🔄 Auto-Restart Mode (Fallback)
```bash
./dev.sh auto     # Restarts server on file changes
npm run dev:restart
```

#### 🧹 Clean Development
```bash
./dev.sh clean    # Clean install and start fresh
```

## 🛠️ Troubleshooting

### If Changes Don't Apply Instantly:
1. **Check browser console** for HMR errors
2. **Hard refresh** (Ctrl+F5 or Cmd+Shift+R)
3. **Clear Vite cache**: `rm -rf node_modules/.vite`
4. **Restart dev server**: `npm run dev`

### Common Issues:
- **Port 8080 in use**: Script automatically kills conflicting processes
- **HMR not working**: Check that you're using `npm run dev` (not restart mode)
- **Build errors**: Fix TypeScript/ESLint errors first

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   └── ui/             # Base UI components
├── pages/              # Page components
│   └── admin/          # Admin pages
├── contexts/           # React contexts
├── hooks/              # Custom hooks
└── lib/                # Utilities
```

## 🎨 Development Features

- **Hot Module Replacement**: Instant updates without page refresh
- **TypeScript**: Full type checking and IntelliSense
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first styling
- **Professional Theme System**: Multiple themes with smooth transitions

## 🔧 Available Scripts

```bash
npm run dev              # Development server with HMR
npm run dev:auto         # Dev server + type checking
npm run dev:restart      # Auto-restart on changes
npm run build            # Production build
npm run preview          # Preview production build
npm run check            # Full validation (types + lint + build)
```

## 💡 Pro Tips

1. **Use `./dev.sh`** for the best development experience
2. **Check browser dev tools** for HMR status
3. **Use VS Code** with TypeScript and Tailwind extensions
4. **Run `npm run check`** before committing
5. **Keep dependencies updated** with `npm update`

---

**Happy coding! 🎉**
