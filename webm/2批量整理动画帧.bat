@echo off
setlocal enableextensions enabledelayedexpansion
rem ��ʼmwtp.exe���ڵ�·��
set path_mwtp=C:\Users\dxt\Desktop\animation Handle
if exist "%path_mwtp%"\mwtp.exe goto start_webm
set /p path_mwtp=Input_mwtp.exe_Path��
if not exist "%path_mwtp%"\mwtp.exe (
echo %path_mwtp% notFind mwtp.exe
goto end
)
:start_webm
set /p path_webm=Input_webm_Path��
if not exist "%path_webm%"\*.webm (
echo %path_webm% notFind webm
goto end
)
cd /d %path_webm%
rem ��ȡ�������ļ�����
for /f "delims=" %%a in ('dir /b *.webm') do (
echo;%%~na>>webm_name.txt
)
rem ���ݻ�ȡ�����ִ����ļ��У����������ļ��ƶ����������ļ����У�������ת���ɶ���֡
for /f "delims=!" %%i in (webm_name.txt) do (
md %%i
MOVE %%i.webm %%i
"%path_mwtp%"\mwtp.exe %%i/%%i.webm
)
REM �Ƿ�ȫ������ת���ɹ���ÿ���ļ����Ƿ���pngͼƬ������ͼʧ��ʱ����ffmpeg.exe�ٴβü�
for /f "delims=!" %%i in (webm_name.txt) do (
set newpath=%%i
REM set newpath=!path:~0,-1!
if not exist "!path_webm!\!newpath!\*.png" ( 
echo !newpath!��ͼʧ�� 
"!path_mwtp!\ffmpeg.exe" -i !newpath!\!newpath!.webm -r 30 !newpath!\!newpath!_%%d.png
))
rem ɾ���ļ����е�webm�ļ�
for /f "delims=!" %%i in (webm_name.txt) do (
cd /d %path_webm%/%%i
del %%i.webm
)
cd /d %path_webm%
del webm_name.txt
:end
pause >nul 
exit

