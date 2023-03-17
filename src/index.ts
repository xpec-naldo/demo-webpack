/**
 * Entry: Exec App
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com> *
 * @returns {void}
 */

import { ImageDownloader } from "./classes/ImageDownloader"
import { IImageDownloaderOptions } from "./interfaces/IImageDownloaderOptions"

const url = "https://www.omnixcorp.com/"
const options: IImageDownloaderOptions = {
  max_width: 200,
  max_height: 200,
  extensions: [".png"],
}

const downloader = new ImageDownloader(url, options)
//downloader.download()
