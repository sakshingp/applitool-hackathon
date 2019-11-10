import ChartPage from './chartPage';

class AppPage {

    get transactionTable() {return $('//*[@id="transactionsTable"]')}
    get compareExpenseButton() {return $('//*[@id="showExpensesChart"]')}
    get flashSaleGifs() {return $$('//*[contains(@id, "flashSale")]//img')}

    clickTransactionTableHeader (headerName) {

        let tableHeaders = this.transactionTable.$$('th');
        for(let i = 0; i < tableHeaders.length; i++) {
            if(tableHeaders[i].getText().toLowerCase() === headerName.toLowerCase()) {
                tableHeaders[i].click();
                break;
            }
        }
    }

    getValuesOfTransactionTableHeader (headerName) {
        let tableHeaders = this.transactionTable.$$('th');
        let values = [];
        for(let i = 0; i < tableHeaders.length; i++) {
            if(tableHeaders[i].getText().toLowerCase() === headerName.toLowerCase()) {
                let column = this.transactionTable.$$('//tbody/tr/td[' + ++i + ']');
                for(let j = 0; j < column.length; j++) {
                    values.push(column[j].getText());
                }
                break;
            }
        }
        return values;
    }

    openCompareExpensePage () {
        this.compareExpenseButton.click();
        ChartPage.waitForPageToLoad();
    }
}

export default new AppPage()