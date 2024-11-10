# Use this script with 'sh src/utils/deploy.sh' to deploy the app to Firebase
#
# Prerequisites:
# - Firebase CLI installed
# - Firebase project set up
# - Firebase project configured in the local environment
#
# This script does the following:
# 1. Copy production ENV variables to local environment
# 2. Run 'npm run build' to create a build directory with all relevant app content
# 3. Deploy app to Firebase
# 4. Copy development ENV variables to local environment

echo "Copying production ENV variables to local environment";
cp .env.prod .env;
echo "Finished copying production ENV variables to local environment";

echo "Creating a production app build";
npm run build;
echo "Finished creating a production app build";

echo "Deploying to Firebase";
firebase deploy;
echo "Finished deploying to Firebase";

echo "Copying development ENV variables to local environment";
cp .env.dev .env;
echo "Finished copying development ENV variables to local environment";
