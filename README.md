Require:
- Node version 6.9.1, (unable to use node-gyp in higher node version)

Development: 
- npm run dev

Production:
- NODE_ENV=production npm run build
- NODE_ENV=production npm start e.g. on nextempire production server: NODE_ENV=production PORT=5000 forever start -c 'node .' ./
