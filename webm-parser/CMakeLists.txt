cmake_minimum_required(VERSION 3.20)


set(name parseWebm)
project(${name})

set(CMAKE_CXX_STANDARD 20)

include_directories(
		third/xxlib
		third/webm
)

set(SRCS2)
file(GLOB_RECURSE SRCS2
		src/*.h
		src/*.hpp
		src/*.inc
		src/*.c
		src/*.cpp
		)


add_executable(${name} ${SRCS2} webm
)

		
add_subdirectory(third/webm webm)
add_subdirectory(third/xxlib xxlib)

target_link_libraries(${name} webm xxlib)