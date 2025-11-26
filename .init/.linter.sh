#!/bin/bash
cd /home/kavia/workspace/code-generation/react-tailwind-web-interface-2092-2101/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

