cd C:/Users/Juulia/arttu/pesis/pesisFront &&
ng build --prod --output-path=dist &&
docker build . -t front &&
heroku container:push web -a pesisstats &&
heroku container:release web -a pesisstats