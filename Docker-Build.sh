#!/bin/bash

project=socials
current_commit=$(git rev-parse --short HEAD)
current_commit_tag=diamkil/$project:ejs-$current_commit
latest_tag=diamkil/$project:ejs

echo "Building $current_commit_tag and $latest_tag"

docker build . -t $current_commit_tag -t $latest_tag

echo "Pushing all built images"

docker image push $current_commit_tag
docker image push $latest_tag

echo "Pushed $current_commit_tag and $latest_tag"