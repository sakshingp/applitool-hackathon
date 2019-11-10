class ChartPage {

    get showNextYearDataBtn() {return $('//*[@id="addDataset"]')}
    get chart() {return $('//*[@id="canvas"]')}

    waitForElement (element) {
        element.waitForDisplayed(10000);
    }

    waitForPageToLoad () {
        if(!this.chart.isDisplayed()){
            this.chart.waitForDisplayed(15000);
        }
    }

    getYearWiseData (year){
        let result = browser.execute(() => {
            let obj = {};
            obj.labels=window.barChartData.labels;
            var datasets=[];
            for(let i=0;i<window.barChartData.datasets.length;i++){
                datasets.push({label: window.barChartData.datasets[i].label, data: window.barChartData.datasets[i].data})
            }
            obj.datasets=datasets;
            return obj;
        });

        let data = result.datasets.filter(function(dataset){
            if(dataset.label == year){
                return dataset.data
            }
        });
        return data[0].data;
    }
}

export default new ChartPage()