exports.loginCredentials = [
    {
        username: '',
        password: '',
        title: 'should verify warning message on login with blank username and blank password',
        message: 'Both Username and Password must be present'
    },
    {
        username: 'test',
        password: '',
        title: 'should verify warning message on login with blank password',
        message: 'Password must be present'
    },
    {
        username: '',
        password: 'password',
        title: 'should verify warning message on login with blank username',
        message: 'Username must be present'
    },
    {
        username: 'test',
        password: 'password',
        title: 'should verify login with valid username and password',
    }
];

exports.expenseChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "2017",
            data: [10, 20, 30, 40, 50, 60, 70]
        },
        {
            label: "2018",
            data: [8, 9, -10, 10, 40, 60, 40]
        }
    ]
};

exports.expenseChartNextYearData = {
    label: "2019",
    data: [5, 10, 15, 20, 25, 30, 35]
};

exports.flashSaleImages = ['/img/flashSale.gif', '/img/flashSale2.gif'];