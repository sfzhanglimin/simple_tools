@echo off
setlocal enableextensions enabledelayedexpansion
rem 初始mwtp.exe所在的路径
set path_mwtp=C:\Users\dxt\Desktop\animation Handle
if exist "%path_mwtp%"\mwtp.exe goto start_webm
set /p path_mwtp=Input_mwtp.exe_Path：
if not exist "%path_mwtp%"\mwtp.exe (
echo %path_mwtp% notFind mwtp.exe
goto end
)
:start_webm
set /p path_webm=Input_webm_Path：
if not exist "%path_webm%"\*.webm (
echo %path_webm% notFind webm
goto end
)
cd /d %path_webm%
rem 获取ｗｅｂｍ文件名字
for /f "delims=" %%a in ('dir /b *.webm') do (
echo;%%~na>>webm_name.txt
)
rem 根据获取的名字创建文件夹，将ｗｅｂｍ文件移动到创建的文件夹中，并将其转换成动画帧
for /f "delims=!" %%i in (webm_name.txt) do (
md %%i
MOVE %%i.webm %%i
"%path_mwtp%"\mwtp.exe %%i/%%i.webm
)
REM 是否全部动画转换成功，每个文件里是否有png图片，当裁图失败时就用ffmpeg.exe再次裁剪
for /f "delims=!" %%i in (webm_name.txt) do (
set newpath=%%i
REM set newpath=!path:~0,-1!
if not exist "!path_webm!\!newpath!\*.png" ( 
echo !newpath!裁图失败 
"!path_mwtp!\ffmpeg.exe" -i !newpath!\!newpath!.webm -r 30 !newpath!\!newpath!_%%d.png
))
rem 删除文件夹中的webm文件
for /f "delims=!" %%i in (webm_name.txt) do (
cd /d %path_webm%/%%i
del %%i.webm
)
cd /d %path_webm%
del webm_name.txt
:end
pause >nul 
exit

