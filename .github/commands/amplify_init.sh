#!/bin/sh
set -e
# IFS=’|’

REACTCONFIG=”{\
\”SourceDir\”:\”src\”,\
\”DistributionDir\”:\”out\”,\
\”BuildCommand\”:\”npm run-script build\”,\
\”StartCommand\”:\”npm run-script start\”\
}”

AWSCLOUDFORMATIONCONFIG=”{\
\”configLevel\”:\”project\”,\
\”useProfile\”:true,\
\”profileName\”:\”default\”,\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"$AWS_REGION\"\
}”

AMPLIFY=”{\
\”projectName\”:\”nomoca-order\”,\
\”envName\”:\”devlop\”,\
\”defaultEditor\”:\”code\”\
}”

FRONTEND=”{\
\”frontend\”:\”javascript\”,\
\”framework\”:\”react\”,\
\”config\”:$REACTCONFIG\
}”

PROVIDERS=”{\
\”awscloudformation\”:$AWSCLOUDFORMATIONCONFIG\
}”
amplify init \
—- amplify $AMPLIFY \
-- frontend $FRONTEND \
-- providers $PROVIDERS \
-- yes