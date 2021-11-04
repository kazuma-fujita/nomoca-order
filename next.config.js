/** @type {import('next').NextConfig} */
module.exports = {
  // reactStrictMode: true,
  reactStrictMode: false, // trueの場合react-beautiful-dndを使用しているpageでerrorが発生する為falseに変更。debug buildでStrictModeで検証が必要な場合は必ずtrueに変更すること
  swcMinify: true, // use SWC for minification
};
