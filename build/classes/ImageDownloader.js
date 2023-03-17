"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDownloader = void 0;
/**
 * classes: ImageDownloader
 *
 * @version 1.0.1
 * @author Naldo Duran <naldorck@gmail.com> *
 * @returns {ImageDownloader}
 */
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const path = __importStar(require("path"));
const sharp_1 = __importDefault(require("sharp"));
class ImageDownloader {
    constructor(url, options) {
        this.url = url;
        this.options = options;
    }
    download() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.url);
                const html = response.data;
                const dom = new jsdom_1.JSDOM(html);
                const images = dom.window.document.querySelectorAll("img");
                console.log("images founds", images.length);
                for (const image of images) {
                    const src = image.getAttribute("src");
                    if (src && this.has_extension(src)) {
                        const image_response = yield axios_1.default.get(src, {
                            responseType: "arraybuffer",
                        });
                        const buffer = Buffer.from(image_response.data);
                        const file_name = path.basename(src);
                        const ext = path.extname(file_name);
                        const base_name = file_name.slice(0, -ext.length);
                        const resized_filename = `${base_name}-${this.options.max_width}x${this.options.max_height}${ext}`;
                        const output_path = path.join(process.cwd(), "imgs", resized_filename);
                        (0, sharp_1.default)(buffer)
                            .resize(this.options.max_width, this.options.max_height, { fit: "contain" })
                            .toFile(output_path)
                            .then(() => {
                            console.log(`Image saved as ${resized_filename}`);
                        })
                            .catch((err) => {
                            console.error(err);
                        });
                    }
                }
            }
            catch (error) {
                console.log(`ERROR ${(_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status}:`, (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.statusText, (_d = (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.config) === null || _d === void 0 ? void 0 : _d.url);
                console.log("-----------------------------------------");
            }
        });
    }
    has_extension(url) {
        return this.options.extensions.some((ext) => url.endsWith(ext));
    }
}
exports.ImageDownloader = ImageDownloader;
