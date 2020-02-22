FROM nginx:latest

# copy artifact build from the 'build environment'
COPY /dist/pesisStatistiikka /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
CMD sed -i -e 's/PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
#CMD nginx -g 'daemon off;'