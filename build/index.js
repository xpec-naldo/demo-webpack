"use strict";
/**
 * Entry: Exec App
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com> *
 * @returns {IImageDownloaderOptions}
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ImageDownloader_1 = require("./classes/ImageDownloader");
const url = "https://www.omnixcorp.com/";
const options = {
    max_width: 200,
    max_height: 200,
    extensions: [".png"],
};
const downloader = new ImageDownloader_1.ImageDownloader(url, options);
downloader.download();
