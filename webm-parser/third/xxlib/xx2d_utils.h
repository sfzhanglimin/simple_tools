#pragma once
#include <string_view>
#include "xx_data.h"

namespace xx {

    void ZstdDecompress(std::string_view const& src, Data& dst);

}
