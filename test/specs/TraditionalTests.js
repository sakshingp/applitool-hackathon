const assert = require('assert');
const testData = require('../test-data/testData');
const util = require('../../utilites/commonUtils');
const env = require('../test-data/envData');

import LoginPage from '../pageobjects/loginPage';
import AppPage from '../pageobjects/appPage';
import ChartPage from '../pageobjects/chartPage';


describe('Login Page UI Element Test', () => {
    before(() => {
        LoginPage.open(VERSION.url);
    });

    it('should verify logo', () => {
        assert.strictEqual(LoginPage.logo.isDisplayed(), true, 'Login form logo is not visible on page');
        assert.strictEqual(LoginPage.logo.getAttribute('src'), browser.config.baseUrl + '/img/logo-big.png');
    });

    it('should verify login form heading', () => {
        assert.strictEqual(LoginPage.loginFormHeading.isDisplayed(), true, 'Login form heading is not visible on page');
        assert.strictEqual(LoginPage.loginFormHeading.getText(), 'Login Form');
    });

    it('should verify username label', () => {
        assert.strictEqual(LoginPage.usernameLabel.isDisplayed(), true, 'Username label is not visible on page');
        assert.strictEqual(LoginPage.usernameLabel.getText(), 'Username');
    });

    it('should verify username input and placeholder', () => {
        assert.strictEqual(LoginPage.usernameInput.isDisplayed(), true, 'Username input is not visible on page');
        assert.strictEqual(LoginPage.usernameInput.getAttribute('placeholder'), 'Enter your username');
    });

    it('should verify username icon', () => {
        assert.strictEqual(LoginPage.usernameIcon.isDisplayed(), true, 'Username icon is not visible on page');
    });

    it('should verify password label', () => {
        assert.strictEqual(LoginPage.passwordLabel.isDisplayed(), true, 'Password label is not visible on page');
        assert.strictEqual(LoginPage.passwordLabel.getText(), 'Password');
    });

    it('should verify password input and placeholder', () => {
        assert.strictEqual(LoginPage.passwordInput.isDisplayed(), true, 'Password input is not visible on page');
        assert.strictEqual(LoginPage.passwordInput.getAttribute('placeholder'), 'Enter your password');
    });

    it('should verify password icon', () => {
        assert.strictEqual(LoginPage.passwordIcon.isDisplayed(), true, 'Password icon is not visible on page');
    });

    it('should verify remember me', () => {
        assert.strictEqual(LoginPage.rememberMeInput.isDisplayed(), true, 'Remember me checkbox is not visible on page');
        assert.strictEqual(LoginPage.rememberMeLabel.getText(), 'Remember Me');
    });

    it('should verify login button', () => {
        assert.strictEqual(LoginPage.loginButton.isDisplayed(), true, 'Login button is not visible on page');
        assert.strictEqual(LoginPage.loginButton.getText(), 'Log In');
    });

    it('should verify social icons', () => {
        const socialPlatform = ['twitter', 'facebook', 'linkedin'];
        for(let i = 0; i < socialPlatform.length; i++) {
            if(LoginPage.socialIcons[i] !== undefined) {
                assert.strictEqual(LoginPage.socialIcons[i].getAttribute('src'), browser.config.baseUrl + '/img/social-icons/'+ socialPlatform[i] + '.png');
            } else {
                assert.strictEqual(false, true, socialPlatform[i] + ' icon is not present on page')
            }
        }
    });
});

describe('Data driven test', () => {

    before(() => {
        LoginPage.open(VERSION.url);
    });

    testData.loginCredentials.forEach(function (loginObj) {
        it(loginObj.title , () => {
            LoginPage.login(loginObj.username, loginObj.password);
            if(loginObj.hasOwnProperty('message')) {
                LoginPage.waitForElement(LoginPage.warning);
                assert.strictEqual(LoginPage.warning.getText(), loginObj.message);
            } else {
            //    toDo
            }
        });
    });
});

describe('Table sort test', () => {
    before(() => {
        LoginPage.open(VERSION.url);
        LoginPage.login(VERSION.username, VERSION.passwoed);
    });

    it('should verify that the column is in ascending order and ' +
        'each row’s data stayed in tact after the sorting' , () => {
        AppPage.clickTransactionTableHeader('amount');
        let amountValues = AppPage.getValuesOfTransactionTableHeader('amount');
        amountValues = amountValues.map(function(val){
            return parseFloat(val.replace(',', '').replace(' ',''));
        });
        assert.equal(amountValues.length > 0, true);
        assert.equal(util.isSorted(amountValues), true, 'Amount values are not sorted in ascending order -> ' + amountValues);
    });
});

describe('Canvas chart test', () => {
    before(() => {
        LoginPage.open(VERSION.url);
        LoginPage.login(VERSION.username, VERSION.passwoed);
    });

    it('should verify expenses of year 2017, 2018' , () => {
        AppPage.openCompareExpensePage();
        let chartTestData = testData.expenseChartData.datasets;
        let result;
        for(let i=0; i < chartTestData.length; i++) {
            result = ChartPage.getYearWiseData(chartTestData[i].label);
            assert.strictEqual(util.isEqual(result, chartTestData[i].data), true, chartTestData[i].label +
                ' - actual chart data ' + result + '\n expected chart data ' + chartTestData[i].data);
        }
    });

    it('should verify expenses of year 2019 by clicking next year data' , () => {
        ChartPage.showNextYearDataBtn.click();
        let result = ChartPage.getYearWiseData(testData.expenseChartNextYearData.label);
        assert.strictEqual(util.isEqual(result, testData.expenseChartNextYearData.data), true, testData.expenseChartNextYearData.label +
            ' - actual chart data ' + result + '\n expected chart data ' + testData.expenseChartNextYearData.data);
    })
});

describe('Dynamic content test', () => {
    before(() => {
        LoginPage.open(VERSION.url + '?showAd=true');
        LoginPage.login(VERSION.username, VERSION.passwoed);
    });

    it('should verify two different "Flash sale" gifs' , () => {
        assert.strictEqual(AppPage.flashSaleGifs.length, 2,
            'Actual flash sale gif count - ' + AppPage.flashSaleGifs.length + '\nExpected flash sale gif count - 2');
        for(let i = 0; i < AppPage.flashSaleGifs.length; i++) {
            assert.strictEqual(AppPage.flashSaleGifs[i].getAttribute('src'), browser.config.baseUrl + testData.flashSaleImages[i]);
        }
    });
});