FROM node:alpine

WORKDIR /app
COPY package.json .
# the flag is to avoid installing the mongo db memory binary and save some space
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]