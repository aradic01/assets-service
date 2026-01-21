# -----------------------------------------
# Stage 1: Build stage
# -----------------------------------------
FROM node:22.18.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# -------------------------------------------
# Stage 2: Runtime stage
# -------------------------------------------

FROM node:22.18.0

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated

CMD ["npm", "run", "start:prod"]