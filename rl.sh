#!/bin/bash
cd ..;cd wxkit/;tsc;nvp;cd ..;cd root-ts;sleep 5;npm install --save wxkit@latest;./build;nvp; sleep 5;cd ..;cd fzs-redwood/server; npm install root-ts@latest --save;cd ../;./util/release;./util/remote.log
