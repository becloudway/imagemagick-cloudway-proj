"use strict";

const os = require("os");

const { spawn } = require("./child-spawn-process");
const { prefixCommand } = require("./utility");

const WORKING_DIR = os.tmpdir();

/**
 * Creates a GIF of the images selected by the glob and stores it to the file system.
 * Using image-magick binaries by spawning a child process.
 *
 * __Magick Command__: convert -delay 5 -loop 0 ./test_data/loop-me-*.png ./test_data/results/looped.gif
 *
 * @remark target directory should exist, will fail if not.
 * @remark relative to the WORK_DIR which is by default set to the temp directory of the OS
 * 
 * @remark more info: [image-magick animation docks](https://legacy.imagemagick.org/Usage/anim_basics/)
 *
 * @example
 * await createGif(
 *   path.join(__dirname, "test_data", "loop-me-*.png"),
 *   path.join(__dirname, "test_data", "results", "looped.gif")
 * );
 *
 * @param {string} imageSelectionGlob - a glob patter to select the images that are part of the loop
 * @param {string} outputFilePath - the location and filename to store the file at
 * @param {number} [delay=5] - the delay between frames
 * @param {number} [loop=0] - the amount of loops (0=infinite)
 * @param {{workingDir: string}} options - additional options
 */
const createGif = async (
  imageSelectionGlob,
  outputFilePath,
  delay = 5,
  loop = 0,
  options = {}
) => {
  await spawn(
    prefixCommand("convert"),
    ["-delay", delay, "-loop", loop, imageSelectionGlob, outputFilePath],
    { env: process.env, cwd: options.workingDir || WORKING_DIR }
  );
};

/**
 * Resizes an image to the given image size and stores it to the file system.
 * Using image-magick binaries by spawning a child process.
 * 
 * __Magick Command__ convert -resize 256x128 ./test_data/loop-me-2.png ./test_data/results-loop-me-2.png
 * 
 * @remark valid size options are (percentage) 50% and (pixels) 50x50.
 * by default imagemagick tries to keep aspect ratio in tact use \! to overrule this for example: 50x50\!
 * or one of the other options as specified in the link below.
 * 
 * @remark more info: [image-magick resize docs](https://legacy.imagemagick.org/Usage/resize/#resize)
 * 
 * @example
 * await resizeImage(
 *   path.join(__dirname, "test_data", "loop-me-2.png"),
 *   resultPath,
 *   "256x128"
 * );
 * 
 * @param {string} targetImage - the image that's to be resized
 * @param {string} toSize - the size to which to resize the image "-resize" option of imagemagick
 * @param {string} outputFilePath - the path and filename of the file to store
 * @param {{workingDir: string}} options - additional options
 */
const resizeImage = async (
  targetImage,
  outputFilePath,
  toSize,
  options = {}
) => {
  await spawn(
    prefixCommand("convert"),
    ["-resize", toSize, targetImage, outputFilePath],
    { env: process.env, cwd: options.workingDir || WORKING_DIR }
  );
};

module.exports = {
  createGif,
  resizeImage,
};
