# -*- coding: UTF-8 -*-
import os
 
#文件路径，在最后加一上\
path='C:\\Users\\dxt\\Desktop\\animationHandle\\test\\'
#listdir()用于获取路径下的所有文件
dirs = os.listdir(path)

for dir in dirs:
    print("----------------------")
    print(dir)
    files = os.listdir(path+dir)
    a = True
    for file in files:
        a = not a
        if a:
            os.remove(path + dir + "\\" + file)