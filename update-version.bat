@echo off
REM Simple script to update version.json with current git info
REM Usage: Just run this script after making a git commit

REM Get short commit hash
for /f %%i in ('git rev-parse --short HEAD') do set COMMIT_HASH=%%i

REM Get current date
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do (
    set MONTH=%%a
    set DAY=%%b
    set YEAR=%%c
)

REM Get last 2 digits of year
set YEAR=%YEAR:~-2%

REM Create version number (format: 1.MM.DDYY)
set VERSION=1.%MONTH%.%DAY%%YEAR%

REM Get commit date
for /f %%i in ('git log -1 --format^=%%cd --date^=short') do set COMMIT_DATE=%%i

REM Write to version.json
(
echo {
echo   "version": "%VERSION%",
echo   "commit": "%COMMIT_HASH%",
echo   "date": "%COMMIT_DATE%"
echo }
) > version.json

echo ✅ version.json updated: v%VERSION% ^(%COMMIT_HASH%^)
echo.
echo Now run: git add version.json
echo Then: git commit --amend --no-edit
