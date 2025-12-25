#!/bin/sh
# Git post-commit hook to auto-update version.json
# 
# Installation: Copy this file to .git/hooks/post-commit
# On Windows: Make sure Git Bash is installed

# Get the latest commit hash (short version)
COMMIT_HASH=$(git rev-parse --short HEAD)

# Get the current date in YYYY-MM-DD format
COMMIT_DATE=$(git log -1 --format=%cd --date=format:%Y-%m-%d)

# Generate version number based on date (format: 1.MM.DDYY)
VERSION=$(date +1.%m.%d%y)

# Create/update version.json
cat > version.json << EOF
{
  "version": "$VERSION",
  "commit": "$COMMIT_HASH",
  "date": "$COMMIT_DATE"
}
EOF

# Stage the updated version.json
git add version.json

# Amend the commit to include version.json (only if it changed)
git diff --cached --quiet version.json || git commit --amend --no-edit --no-verify

echo "✅ version.json updated: v$VERSION ($COMMIT_HASH)"
