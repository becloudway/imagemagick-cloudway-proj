# Cloudway-ImageMagick-Proj

> Library used for example projects, not production worthy code use at own risk.

## Documentation

The library contains 2 methods that make using imagemagick a bit easier and thus our "example" projects more fun.

__resizeImage__

```js
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
const resizeImage = async (targetImage, outputFilePath, toSize, options = {}) => { /* ... */ }
```

For more info on the toSize param which is the -resize param in ImageMagick see:
[image-magick resize docs](https://legacy.imagemagick.org/Usage/resize/#resize)

__createGif__

```js
/**
 * Creates a GIF of the images selected by the glob and stores it to the file system.
 * Using image-magick binaries by spawning a child process.
 *
 * __Magick Command__: convert -delay 5 -loop 0 ./test_data/loop-me-*.png ./test_data/results/looped.gif
 *
 * @remark target directory should exist, will fail if not.
 * @remark relative to the WORK_DIR which is by default set to the temp directory of the OS
 * 
 * @remark more info: [image-magick animation docs](https://legacy.imagemagick.org/Usage/anim_basics/)
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
const createGif = async (imageSelectionGlob, outputFilePath, delay = 5, loop = 0, options = {}) => { /* ... */ }
```

For more info on the animation properties of image-magick see: [image-magick animation docks](https://legacy.imagemagick.org/Usage/anim_basics/)

## How to use

When deploying to AWS Lambda you can use relative paths and store the file using the working directory which defaults
to the temp directory of the operating system. For AWS Lambda the temp directory is the only directory you can write too.

From there you could upload the file to fi. S3.

## Getting the binaries

This library expects that the function that you are using has the image-magick binaries.
The easiest way of getting these is using a layer and I would recommend deploying it using the following SAR template:

https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~image-magick-lambda-layer

For more info regarding the layer see:

https://github.com/serverlesspub/imagemagick-aws-lambda-2/tree/master

For more info on AWS Lambda Layers see:
- Info regarding the usage of layers with AWS Lambda: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
- Example provided by the layer maintainer: https://github.com/serverlesspub/imagemagick-aws-lambda-2/tree/master/example


## Running locally

If you have the imagemagick binaries on your path you can disable the prefixing for the layer using the environment variable `DISABLE_BIN_PREFIX`:

```bash
export DISABLE_BIN_PREFIX=yes
```