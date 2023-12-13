cmake_minimum_required(VERSION 3.20)


project(xxlib)

include_directories(
	./
	../zstd/lib
)

set(SRCSD)
file(GLOB_RECURSE SRCSD
	*.c
	*.h
	*.cpp
)

SET(ZSTD_BUILD_PROGRAMS OFF CACHE BOOL "ZSTD_BUILD_PROGRAMS" FORCE)
SET(ZSTD_BUILD_SHARED OFF CACHE BOOL "ZSTD_BUILD_SHARED" FORCE)
SET(ZSTD_BUILD_TESTS OFF CACHE BOOL "ZSTD_BUILD_SHARED" FORCE)
SET(ZSTD_LEGACY_SUPPORT OFF CACHE BOOL "ZSTD_LEGACY_SUPPORT" FORCE)
SET(ZSTD_MULTITHREAD_SUPPORT OFF CACHE BOOL "ZSTD_MULTITHREAD_SUPPORT" FORCE)
add_subdirectory(../zstd/build/cmake zstd)

add_library(xxlib ${SRCSD})
target_link_libraries(xxlib libzstd_static)

set_target_properties(xxlib PROPERTIES LINKER_LANGUAGE CXX)
