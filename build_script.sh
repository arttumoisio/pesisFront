cd C:\Users\Juulia\arttu\pesis\pesisFront
ng build --prod --output-path=dist
docker build . -t front
heroku container:push web --app young-beyond-12566
heroku container:release web --app young-beyond-12566