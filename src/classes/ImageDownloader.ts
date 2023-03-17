/**
 * classes: ImageDownloader
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com> *
 * @returns {ImageDownloader}
 */
import axios from "axios"
import { JSDOM } from "jsdom"
import * as fs from "fs"
import * as path from "path"
import sharp from "sharp"
import { IImageDownloaderOptions } from "../interfaces/IImageDownloaderOptions"
import { isUri } from "valid-url"

export class ImageDownloader {
  private url: string
  private options: IImageDownloaderOptions

  constructor(url: string, options: IImageDownloaderOptions) {
    this.url = url
    this.options = options
  }

  public async download() {
    try {
      if (!isUri(this.url)) {
        throw new Error("Url:invalid")
      }

      const response = await axios.get(this.url)
      const html = response.data
      const dom = new JSDOM(html)
      const images = dom.window.document.querySelectorAll("img")
      console.log("images founds", images.length)
      for (const image of images) {
        const src = image.getAttribute("src")

        if (src && this.has_extension(src as string)) {
          const image_response = await axios.get(src as string, {
            responseType: "arraybuffer",
          })
          const buffer = Buffer.from(image_response.data)
          const file_name = path.basename(src as string)
          const ext = path.extname(file_name)
          const base_name = file_name.slice(0, -ext.length)
          const resized_filename = `${base_name}-${this.options.max_width}x${this.options.max_height}${ext}`
          const output_path = path.join(process.cwd(), "imgs", resized_filename)

          /*await sharp(buffer)
            .resize(this.options.max_width, this.options.max_height, { fit: "contain" })
            .toFile(output_path)*/

          console.log(`Image saved as ${resized_filename}`)
        }
      }

      return "Process finished"
    } catch (error: any) {
      throw new Error(error)
    }
  }

  private has_extension(url: string): boolean {
    return this.options.extensions.some((ext) => url.endsWith(ext))
  }
}
