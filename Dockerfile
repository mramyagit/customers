FROM node:18.16.0-alpine

# Create app directory
WORKDIR /var/www/customers

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install

EXPOSE 4646
CMD [ "node", "customers.js" ]