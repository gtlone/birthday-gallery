const fetch = require('node-fetch');

async function getLunarDates() {
    const dates = {};
    
    for (let year = 2003; year <= 2120; year++) {
        try {
            const response = await fetch(`https://www.iamwawa.cn/nongli/api?year=${year}&month=12&day=2`, {
                headers: {
                    'User-Agent': 'iamwawa-open-api'
                }
            });
            const data = await response.json();
            
            if (data && data.status === 1) {
                console.log(`${year}年农历十二月初二对应公历：${data.sYear}年${data.sMonth}月${data.sDate}日`);
                dates[year] = {
                    month: parseInt(data.sMonth),
                    day: parseInt(data.sDate)
                };
            }
            
            // 等待6秒以遵守API限制
            await new Promise(resolve => setTimeout(resolve, 6000));
            
        } catch (error) {
            console.error(`获取${year}年数据失败:`, error);
        }
    }
    
    // 将结果保存到文件
    console.log('完整数据:', JSON.stringify(dates, null, 2));
}

getLunarDates(); 