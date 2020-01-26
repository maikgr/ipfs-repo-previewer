FROM node:alpine as builder
WORKDIR /app

// Download dependencies
COPY package*.json ./
RUN npm ci

// Copy the codes and build
COPY . .
RUN npm run build

//Serve the app using node serve
FROM node:alpine
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]