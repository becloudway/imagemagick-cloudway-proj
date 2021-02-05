const { toMatchImageSnapshot } = require("jest-image-snapshot");
const { createGif, resizeImage } = require("../src/image-magick");

expect.extend({ toMatchImageSnapshot });

const path = require("path");
const fs = require("fs");

describe("image-magick#Unit", () => {
  describe("createGif", () => {
    it("should create a gif with the input data", async () => {
      const resultPath = path.join(
        __dirname,
        "test_data",
        "results-looped.gif"
      );

      await createGif(
        path.join(__dirname, "test_data", "loop-me-*.png"),
        resultPath
      );

      const image = fs.existsSync(resultPath);
      expect(image).toBeTruthy();
    });
  });
  
  describe("resize", () => {
    it("should resize the image", async () => {
      const resultPath = path.join(
        __dirname,
        "test_data",
        "results-loop-me-2.png"
      );

      await resizeImage(
        path.join(__dirname, "test_data", "loop-me-2.png"),
        resultPath,
        "256x128"
      );

      const image = fs.readFileSync(resultPath);

      expect(image).toMatchImageSnapshot();
    });
  });
});
