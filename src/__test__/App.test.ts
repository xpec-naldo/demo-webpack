/**
 * Test: whole pp
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com> *
 * @returns {void}
 */

import { ImageDownloader } from "../classes/ImageDownloader"
import { IImageDownloaderOptions } from "../interfaces/IImageDownloaderOptions"

describe("App --config", () => {
  let url = "http://www.omnixcorp.com/"
  const options: IImageDownloaderOptions = {
    max_width: 200,
    max_height: 200,
    extensions: [".png"],
  }

  test("URL is invalid", async () => {
    const downloader = new ImageDownloader("://www.omnixcorp.com/", options)
    await expect(downloader.download()).rejects.toThrow("Url:invalid")
  })

  test("URL and options are valid and download Process should be completed", async () => {
    const downloader = new ImageDownloader(url, options)
    await expect(downloader.download()).resolves.not.toThrow()
  })
})
