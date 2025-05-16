git pull origin deploy --rebase
sudo rm -rf .next
yarn install
yarn build
pm2 restart 0