#!/bin/bash

safeRunCommand() {
  typeset cmnd="$*"
  typeset ret_code

#   echo cmnd=$cmnd
  eval $cmnd
  ret_code=$?
  if [ $ret_code != 0 ]; then
    printf "Error : [%d] when executing command: '$cmnd'" $ret_code
    exit $ret_code
  fi
}

command="serverless deploy"

echo "Start deploy nested stack"

safeRunCommand "$command"


echo "Finished deploy nested stack"

command="serverless deploy -c serverlessFunctions.yml"

safeRunCommand "$command"


RED='\033[0;31m'
NC='\033[0m' # No Color

echo "${RED}Finished${NC}"

