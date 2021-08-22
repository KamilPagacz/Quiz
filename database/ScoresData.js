const scoresData =
    [
        {
            nick: 'stefan',
            score: 3,
            total: 3,
            type: 'test1',
            date: '20.04.2021',
            key: '0',
        },
        {
            nick: 'stefan',
            score: 4,
            total: 5,
            type: 'test2',
            date: '20.04.2021',
            key: '1',
        },
        {
            nick: 'stefan',
            score: 1,
            total: 5,
            type: 'test3',
            date: '20.04.2021',
            key: '2',
        },
        {
            nick: 'stefan',
            score: 5,
            total: 5,
            type: 'test4',
            date: '20.04.2021',
            key: '3',
        },
    ];

export const pushScore = (props) => {
    const { nick, score, total, type, date } = props;
    scoresData.push({
        nick: nick,
        score: score,
        total: total,
        type: type,
        date: date,
        key: scoresData.length,
    })
}

export const getScoresList = () => {
    return scoresData;
}