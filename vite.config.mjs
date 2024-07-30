/** @type {import('vite').UserConfig} */
import vsharp from "vite-plugin-vsharp";

export default {
    base: "",
    plugins: [
        vsharp({
            ".jpg": {
                quality: 20,
            },
        }),
    ],
};
