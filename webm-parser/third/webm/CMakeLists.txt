cmake_minimum_required(VERSION 3.20)


project(webm)

include_directories(
	./
)

set(SRCS)
file(GLOB_RECURSE SRCS
	*.c
	*.h
)
add_library(webm ${SRCS})
