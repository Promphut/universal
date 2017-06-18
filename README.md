# Note:
- Developed on NodeJS 8.1.1
- Require node-gyp for building lwip (plan to remove this package)
- Development mode uses self-signed cert, other modes uses gen from CA that'll be handled via nginx.

# Development: 
- npm run dev

# Test:
- NODE_ENV=test PORT=5000 npm run build
- NODE_ENV=test node . 
	e.g. on test server: NODE_ENV=test PORT=5000 forever start -c 'node .' ./

# Production:
- NODE_ENV=production PORT=5000 npm run build
- NODE_ENV=production node . 
	e.g. on nextempire production server: NODE_ENV=production PORT=5000 forever start -c 'node .' ./
