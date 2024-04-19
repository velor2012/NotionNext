function extractDate(dateString) {
    // 正则表达式匹配 yyyy-mm-dd 格式的日期
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (regex.test(dateString)) {
      // 如果日期格式正确，提取年月日
      const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
      return { year, month, day };
    } else {
      // 如果日期格式不正确，假设它是一个年份
      const year = parseInt(dateString, 10);
      return { year };
    }
  }
  function getRunTime({year, month, day}) {
    const X = new Date(year, month - 1, day); // 网站开始运行的日期和时间
    const Y = new Date(); // 当前日期和时间
    const T = (Y.getTime() - X.getTime()); // 网站运行的总毫秒数
    const M = 24 * 60 * 60 * 1000; // 一天的毫秒数
    const a = T / M; // 总天数
    const A = Math.floor(a); // 总天数的整数部分
    return A
}
export { extractDate, getRunTime }