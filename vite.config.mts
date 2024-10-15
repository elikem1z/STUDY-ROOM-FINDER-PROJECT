/** @type {import('vite').UserConfig} */
import vsharp from "vite-plugin-vsharp";
import react from "@vitejs/plugin-react-swc";

export default {
    base: "",
    plugins: [
        vsharp({
            ".jpg": {
                quality: 20,
            },
        }),
        react(),
    ],
};
