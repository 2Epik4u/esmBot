#include <vips/vips8>

#include "common.h"

using namespace std;
using namespace vips;

const vector<double> zeroVec178 = {0, 0, 0, 178};

ArgumentMap Snapchat(const string& type, string& outType, const char* bufferdata, size_t bufferLength, ArgumentMap arguments, size_t& dataSize)
{
  string caption = GetArgument<string>(arguments, "caption");
  float pos = GetArgumentWithFallback<float>(arguments, "pos", 0.5);
  string basePath = GetArgument<string>(arguments, "basePath");

  VOption *options = VImage::option()->set("access", "sequential");

  VImage in =
      VImage::new_from_buffer(bufferdata, bufferLength, "",
                              type == "gif" ? options->set("n", -1) : options)
          .colourspace(VIPS_INTERPRETATION_sRGB);
  if (!in.has_alpha()) in = in.bandjoin(255);

  int width = in.width();
  int pageHeight = vips_image_get_page_height(in.get_image());
  int nPages = vips_image_get_n_pages(in.get_image());
  int size = width / 20;
  int textWidth = width - ((width / 25) * 2);

  string font_string = "Helvetica Neue " + to_string(size);

  LoadFonts(basePath);
  VImage textIn = VImage::text(
      ("<span foreground=\"white\" background=\"#000000B2\">" + caption +
       "</span>")
          .c_str(),
      VImage::option()
          ->set("rgba", true)
          ->set("align", VIPS_ALIGN_CENTRE)
          ->set("font", font_string.c_str())
          ->set("fontfile", (basePath + "assets/fonts/caption2.ttf").c_str())
          ->set("width", textWidth));
  int bgHeight = textIn.height() + (width / 25);
  textIn = ((textIn == zeroVec).bandand())
               .ifthenelse(zeroVec178, textIn)
               .embed((width / 2) - (textIn.width() / 2),
                      (bgHeight / 2) - (textIn.height() / 2), width, bgHeight,
                      VImage::option()
                          ->set("extend", "background")
                          ->set("background", zeroVec178));

  VImage replicated = textIn.embed(0, pageHeight * pos, width, pageHeight)
                          .copy(VImage::option()->set("interpretation",
                                                      VIPS_INTERPRETATION_sRGB))
                          .replicate(1, nPages);
  VImage final = in.composite(replicated, VIPS_BLEND_MODE_OVER);

  char *buf;
  final.write_to_buffer(
      ("." + outType).c_str(), reinterpret_cast<void**>(&buf), &dataSize,
      outType == "gif"
          ? VImage::option()->set("dither", 0)->set("reoptimise", 1)
          : 0);

  ArgumentMap output;
  output["buf"] = buf;

  return output;
}
