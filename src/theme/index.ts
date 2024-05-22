import { ThemeConfig } from "antd"
import light from "./light"
export const config: ThemeConfig = {
    token: {
        ...light,
        sizeStep: 4,
        sizeUnit: 4,
        borderRadius: 2,
        wireframe: false,
    },
    components: {
        Menu: {
            itemMarginInline: 0,
            itemPaddingInline: 0,
        },
        Layout: {
            bodyBg: 'none',
            borderRadius: 0,
        },
    },
}
export const prefixCls = 'oor'
export default {
    theme: config, prefixCls,
}
