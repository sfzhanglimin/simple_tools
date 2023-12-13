#include "xx2d_mv.h"
#include "xx2d_engine.h"
#include <filesystem>

#include "xx_file.h"


#define SVPNG_LINKAGE inline
#define SVPNG_OUTPUT xx::Data& d
#define SVPNG_PUT(u) d.WriteFixed((uint8_t)(u));
#include "svpng.inc"


xx::Engine* _engine = new xx::Engine();
xx::Mv _webmDecoder;
uint8_t* _rgbas = nullptr;



int RgbaSaveToPng(std::filesystem::path const& fn, uint8_t const* const& bytes, uint32_t const& w, uint32_t const& h) {
	xx::Data d;
	svpng(d, w, h, bytes, 1);
	return xx::WriteAllBytes(fn, d);
}


void decode(std::string input, std::string output) {
	auto datas = _engine->LoadFileDataWithFullPath(input, false);
	_webmDecoder.LoadFromWebm(datas);

	auto webmName = std::filesystem::path(input).stem().string();

	auto outputPathDir = std::filesystem::path(output);
	

	_webmDecoder.ForeachFrame([&](int const& frameIndex,
		uint32_t const& w,
		uint32_t const& h
		, uint8_t const* const& yData,
		uint8_t const* const& uData,
		uint8_t const* const& vData,
		uint8_t const* const& aData,
		uint32_t const& yaStride,
		uint32_t const& uvStride
		)->int {
			if (_rgbas == nullptr) {
				_rgbas = (uint8_t*)malloc(w * h * 4);
			}
			else {
				_rgbas = (uint8_t*)realloc(_rgbas, w * h * 4);
			}

			
			for (uint32_t _h = 0; _h < h; ++_h) {
				for (uint32_t _w = 0; _w < w; ++_w) {
					// 根据坐标结合具体宽高跨距算下标. uv 每个像素对应 ya 4个像素
					auto&& yaIdx = yaStride * _h + _w;
					auto&& uvIdx = uvStride * (_h / 2) + _w / 2;


					// 得到 yuv 原始数据, byte -> float
					auto&& y = yData[yaIdx] / 255.0f;
					auto&& u = uData[uvIdx] / 255.0f;
					auto&& v = vData[uvIdx] / 255.0f;

					// 进一步修正
					y = 1.1643f * (y - 0.0625f);
					u = u - 0.5f;
					v = v - 0.5f;

					// 算出 rgb( float 版 )
					auto&& r = y + 1.5958f * v;
					auto&& g = y - 0.39173f * u - 0.81290f * v;
					auto&& b = y + 2.017f * u;

					// 裁剪为 0 ~ 1
					if (r > 1.0f) r = 1.0f; else if (r < 0.0f) r = 0.0f;
					if (g > 1.0f) g = 1.0f; else if (g < 0.0f) g = 0.0f;
					if (b > 1.0f) b = 1.0f; else if (b < 0.0f) b = 0.0f;

					// 存起来
					//_rgbas.push_back((uint8_t)(r * 255));
					//_rgbas.push_back((uint8_t)(g * 255));
					//_rgbas.push_back((uint8_t)(b * 255));
					//_rgbas.push_back(aData ? aData[yaIdx] : (uint8_t)0);

					_rgbas[(_h * w) * 4 + (_w * 4) + 0] = (uint8_t)(r * 255);
					_rgbas[(_h * w) * 4 + (_w * 4) + 1] = (uint8_t)(g * 255);
					_rgbas[(_h * w) * 4 + (_w * 4) + 2] = (uint8_t)(b * 255);
					_rgbas[(_h * w) * 4 + (_w * 4) + 3] = aData ? aData[yaIdx] : (uint8_t)0;
				}
			}

			std::filesystem::path fileName = webmName + "_" + std::to_string(frameIndex) + ".png";
			auto outputPath = output / fileName;
			RgbaSaveToPng(outputPath.string(), _rgbas, w, h);

			return 0;
		});

}

int main(int argc, char* argv[]) {
	std::string input = "";
	std::string output = "";

	for (int i = 1;i < argc;i += 2) {
		if (argv[i] != nullptr && argv[i + 1] != nullptr) {
			auto key = std::string(argv[i]);
			auto value = std::string(argv[i + 1]);

			if (key == "-i") {
				input = std::string(argv[i + 1]);
			}
			else if (key == "-o") {
				output = std::string(argv[i + 1]);
			}
		}
	}

	if (input.length() > 0 && output.length() > 0) {
		decode(input, output);
	}


	return 0;
}