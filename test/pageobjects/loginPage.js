import Page from './basePage'

class LoginPage extends Page{

    get logo()   { return $('//*[@class="logo-w"]//img'); }
    get loginFormHeading()   { return $('//*[@class="auth-header"]'); }
    get usernameLabel()   { return $('(//label)[1]'); }
    get usernameInput()   { return $('//*[@id="username"]'); }
    get usernameIcon()   { return $('//*[contains(@class, "os-icon-user-male-circle")]'); }
    get passwordLabel()   { return $('(//label)[2]'); }
    get passwordInput()   { return $('//*[@id="password"]'); }
    get passwordIcon()   { return $('//*[contains(@class, "os-icon-fingerprint")]'); }
    get rememberMeInput ()     { return $('//*[@class="form-check-input"]'); }
    get rememberMeLabel ()     { return $('//*[@class="form-check-label"]'); }
    get loginButton()     { return $('//*[@id="log-in"]'); }
    get socialIcons()     { return $$('//form//img'); }
    get warning()   { return $('//*[contains(@class, "alert-warning")]'); }

    open (path) {
        super.open(path)       //this will append `login` to the baseUrl to form complete URL
    }

    waitForPageToLoad () {
        if(!this.loginFormHeading.isDisplayed()){
            this.loginFormHeading.waitForDisplayed(15000);
        }
    }

    waitForElement (element) {
        element.waitForDisplayed(10000);
    }

    login (username, password) {
        this.waitForPageToLoad();
        this.usernameInput.clearValue();
        this.usernameInput.setValue(username);
        this.passwordInput.clearValue();
        this.passwordInput.setValue(password);
        this.loginButton.click();
    }
}

export default new LoginPage()
