FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS secondary
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine
WORKDIR /app

# Copy file dist từ stage builder
COPY --from=builder /app/dist ./dist
COPY --from=secondary /app/node_modules ./node_modules
COPY package*.json ./

USER node

EXPOSE 3000
CMD ["node", "dist/main"]