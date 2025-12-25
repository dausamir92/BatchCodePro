@echo off
setlocal enabledelayedexpansion
REM Simple script to update version.json from git commit info
REM Extracts version from the latest git commit message
REM Example: if commit message is "v1.04.251225", version will be "1.04.251225"

REM Get short commit hash
for /f %%i in ('git rev-parse --short HEAD') do set COMMIT_HASH=%%i

REM Get commit date
for /f %%i in ('git log -1 --format^=%%cd --date^=short') do set COMMIT_DATE=%%i

REM Get commit message (subject line)
for /f "delims=" %%i in ('git log -1 --format^=%%s') do set COMMIT_MSG=%%i

REM Extract version from commit message
REM Remove "v" prefix if present
set VERSION=!COMMIT_MSG!
set VERSION=!VERSION:v=!
set VERSION=!VERSION:V=!

REM Write to version.json
(
echo {
echo   "version": "!VERSION!",
echo   "commit": "!COMMIT_HASH!",
echo   "date": "!COMMIT_DATE!"
echo }
) > version.json

echo ✅ version.json updated
echo    Version: !VERSION!
echo    Commit:  !COMMIT_HASH!
echo    Date:    !COMMIT_DATE!
echo.
echo Commit message was: !COMMIT_MSG!
