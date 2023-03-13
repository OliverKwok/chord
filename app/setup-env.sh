# Only support dev, prod
echo "You are passing env: $1"
FILEPATH="./env/$1"

cp "$FILEPATH/.env" ./
