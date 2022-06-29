#!/bin/bash
set -e
# IFS=’|’

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"out\",\
\"BuildCommand\":\"npm\ run-script\ build\",\
\"StartCommand\":\"npm\ run-script\ start\"\
}"

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\"\
}"

AMPLIFY="{\
\"projectName\":\"nomocaorder\",\
\"envName\":\"develop\",\
\"defaultEditor\":\"code\"\
}"

FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":${REACTCONFIG}\
}"

PROVIDERS="{\
\"awscloudformation\":${AWSCLOUDFORMATIONCONFIG}\
}"

# amplify init \
# --amplify ${AMPLIFY} \
# --frontend ${FRONTEND} \
# --providers ${PROVIDERS} \
# --yes

# echo n | amplify pull \
amplify pull \
--appId ${AMPLIFY_APP_ID} \
--amplify ${AMPLIFY} \
--frontend ${FRONTEND} \
--providers ${PROVIDERS} \
--yes