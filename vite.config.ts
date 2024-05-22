import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    preprocessorOptions:{
        less:{
            
        }
    }
  },
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  // const publicPath = process.env.VITE_BASE_URL;

  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  // base: '/huangbiao/', // 默认是 '/'
  // publicDir: 'public',
  // cacheDir: 'node_modules/.vite',
  // envDir: 'root', // 用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
  // envPrefix: 'VITE_', // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中
  resolve: {
    /* 路径使用别名 */
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url)),
    // },
    /* 
    引入文件的后缀名称，可以省略
    如果出现同名，按照数组加载的优先顺序
    */
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  // 服务配置
  server: {
    hmr: true,
    host: '0.0.0.0',
    port: 3000, // 端口号
    open: true, // 自动在浏览器打开
    // https: true,// 是否开启 https
    // http2: true,// 建议使用 http2, 是否开启 https
    fs: {
      // 可以为项目根目录的上一级提供服务
      allow: ['..'],
    },
    proxy: {
      '^/mockapi': {
        target: 'http://10.32.38.100:3000/',
        changeOrigin: true,
      },
      '^/ctm05zjaefs/': {
        target: 'http://localhost:39696',
        changeOrigin: true,
      },
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // css 处理 
  //  生产环境
  build: {
    //指定输出路径
    assetsDir: './static',
    // 指定输出文件路径
    outDir: 'dist',
    sourcemap: true, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
    // 代码压缩配置
    terserOptions: {
      // 生产环境移除console
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});