/*
 * @Descripttion: 
 * @version: 0.1.0
 * @Author: wenhao.xu
 * @Date: 2020-05-24 08:39:55
 */ 

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")],
        },
      },
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          shouldExtractLiteralValuesFromEnum: true,
          propFilter: (prop) => {
            if (prop.parent) {
              return !prop.parent.fileName.includes("node_modules");
            }
            return true;
          },
        },
      },
    ],
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
