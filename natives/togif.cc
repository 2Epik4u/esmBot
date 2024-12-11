#include <vips/vips8>

#include "common.h"

using namespace std;
using namespace vips;

ArgumentMap ToGif(const string& type, string& outType, const char* bufferdata, size_t bufferLength, [[maybe_unused]] ArgumentMap arguments, size_t& dataSize)
{
  if (type == "webp") {
    dataSize = bufferLength;
    char *data = reinterpret_cast<char*>(malloc(bufferLength));
    memcpy(data, bufferdata, bufferLength);

    ArgumentMap output;
    output["buf"] = data;

    return output;

  } else {
    VOption *options = VImage::option()->set("access", "sequential");

    VImage in = VImage::new_from_buffer(
        bufferdata, bufferLength, "",
        type == "gif" ? options->set("n", -1) : options);

    char *buf;
    in.write_to_buffer(".webp", reinterpret_cast<void**>(&buf), &dataSize);
    outType = "webp";

    ArgumentMap output;
    output["buf"] = buf;

    return output;
  }
}
