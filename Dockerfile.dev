FROM nginx:alpine

# copy artifact build from the 'build environment'
COPY /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD sed -i -e 's/PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
# CMD nginx -g 'daemon off;'