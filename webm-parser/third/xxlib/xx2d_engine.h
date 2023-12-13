#pragma once
#include <filesystem>
#include "xx_data.h"
#include "xx2d_enums.h"

namespace xx {

	struct Engine {
		/**********************************************************************************/
		// file system

		std::vector<std::string> searchPaths;
		std::filesystem::path tmpPath;

		// add relative base dir to searchPaths
		void SearchPathAdd(std::string_view dir);

		// search paths revert to default
		void SearchPathReset();

		// search file by searchPaths + fn. not found return ""
		std::string GetFullPath(std::string_view fn, bool fnIsFileName = true);

		// read all data by full path
		xx::Data LoadFileDataWithFullPath(std::string_view const& fp, bool autoDecompress = true);

		// read all data by GetFullPath( fn )
		std::pair<xx::Data, std::string> LoadFileData(std::string_view const& fn, bool autoDecompress = true);

		// detect file format by content header
		SupportedFileFormats DetectFileFormat(Data_r const& d);

		/**********************************************************************************/
	};

	// default / global instance
	extern Engine engine;
}
