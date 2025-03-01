import path from 'path';
import type {UserConfig, Config} from 'ssr-types';
import {setStyle} from 'ssr-server-utils';
import genericNames from 'generic-names';

const isProd = process.env.NODE_ENV === 'production';

// 详情参考 https://juejin.cn/post/6850418109795434503
const generate = genericNames('[local]__[hash:base64:5]', {
    context: process.cwd(),
});
const generateScopedName = (localName: string, filePath: string) => {
    const relativePath = path.relative(process.cwd(), filePath);
    return generate(localName, relativePath);
};
function setSassLoader(chain: Config, isServer: boolean) {
    setStyle(chain, /\.s[ac]ss$/i, {
        rule: 'sass',
        loader: 'sass-loader',
        importLoaders: 2,
        isServer,
    });
}

const proxyList = [
    '/httservice',
    '/favourite',
    // fix简历页面热更新失效的问题，因为热更新的js也是以/resume开头的
    '/resume/',
    '/userCheckLoginNew',
    '/recommend',
    '/post',
    '/file',
    '/lookup',
    '/tic',
    '/outserver',
    '/executor',
    '/event',
];
function getProxy(list: string[]) {
    const proxyObj = {};
    list.forEach(i => {
        proxyObj[i] = {
            target: 'https://recruit.dev.weiyun.baidu.com',
            changeOrigin: true,
            secure: false,
        };
    });
    return proxyObj;
}
const userConfig: UserConfig = {
    babelOptions: {
        plugins: [
            ['react-css-modules', {
                filetypes: {
                    '.less': {
                        syntax: 'postcss-less',
                    },
                },
                generateScopedName: generate,
                autoResolveMultipleImports: true,
            }],
        ],
    },
    css: () => {
        return {
            loaderOptions: {
                cssOptions: {
                    modules: {
                        auto: /\.mod(ule)?\.\w+$/,
                        getLocalIdent: (context: {resourcePath: string}, _, localName: string) => {
                            return generateScopedName(localName, context.resourcePath);
                        },
                    },
                },
                less: {
                    lessOptions: {
                        javascriptEnabled: true,
                        modifyVars: {
                            // 改变antd的主题
                            'primary-color': '#4e6ef2',
                        },
                    },
                    additionalData: '@import "~@/styles/variable.less";',
                },
            },
        };
    },
    chainClientConfig: chain => {
        setSassLoader(chain, false);
        // 当为打包环境并且是线上环境时，改为hidden-source-map
        chain.when(isProd && process.env.CLIENT_ENV === 'production',
            config => config.devtool('hidden-source-map')
        );
    },
    chainServerConfig: chain => {
        setSassLoader(chain, true);
    },
    serverPort: 8080,
    prefix: process.env.PREFIX,
    define: {
        client: {
            'window.prefix': JSON.stringify(process.env.PREFIX ?? ''),
            /**
             * enum CLIENT_ENV {
             *  ’test‘, // 测试环境
             *  'production' // 生产环境
             * }
             */
            'window.__CLIENT_ENV__': JSON.stringify(process.env.CLIENT_ENV ?? 'test'),
        },
        server: {
            'process.env.__CLIENT_ENV__': JSON.stringify(process.env.CLIENT_ENV ?? 'test'),
        },
    },
    publicPath: !isProd ? '/' : process.env.CDN_PATH ?? '/',
    // publicPath: '/public',
    proxy: !isProd ? getProxy(proxyList) : undefined,
    whiteList: [
        /\.(css|less|sass|scss)$/,
        /vant.*?style/,
        /antd.*?(style)/,
        /ant-design-vue.*?(style)/,
        /store$/,
        /^@befe\/brick/,
        /lodash-es/,
        /react-syntax-highlighter/,
        /@befe\/easy-track/,
    ],
};
export {userConfig};
