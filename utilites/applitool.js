const {
    Eyes,
    Target,
    ClassicRunner,
    Configuration,
    BatchInfo
} = require('@applitools/eyes-webdriverio');

const eyes = new Eyes(new ClassicRunner());
const batchInfo = new BatchInfo();

module.exports = {
    initialize: function(appName, testName, batchId, batchName){
        const configuration = new Configuration();
        if(batchId !== undefined && batchName !== undefined){
            batchInfo.setId(batchId);
            batchInfo.setName(batchName);
            configuration.setBatch(batchInfo);
        }
        configuration.setAppName(appName);
        configuration.setTestName(testName);
        eyes.setConfiguration(configuration);
        eyes.setApiKey(process.env.APPLITOOL_API_KEY);
    },

    startTest: async function(browser){
        await eyes.open(browser);
    },

    takeScreenshotWindow: async function (name) {
        await eyes.check(name, Target.window().fully());
    },

    takeScreenshotRegion: async function (name, region) {
        await eyes.check(name, Target.region(region));
    },

    setMatchingLevel: async function (level) {
        switch(level.toLowerCase()) {
            case 'exact':
                eyes.setMatchLevel('Exact');
                break;
            case 'strict':
                eyes.setMatchLevel('Strict');
                break;
            case 'content':
                eyes.setMatchLevel('Content');
                break;
            case 'layout':
                eyes.setMatchLevel('Layout');
                break;
        }

    },

    endTest: async function(){
        await eyes.close(false);
    },

    fetchResults: async function(){
        const results = await eyes.getRunner().getAllTestResults(false);
        return results;
    },

    handleTestResults: function (summary) {
        let ex = summary.getException();
        let testResult = summary.getTestResults();
        if (ex != null ) {
            console.error("System error occured while checking target.");
        }
        if (!testResult) {
            console.error("No test results information available");
        } else {
            console.log("AppName = %s, testname = %s, Browser = %s,OS = %s, viewport = %dx%d, matched = %d,mismatched = %d, missing = %d,aborted = %s\n",
                testResult.getAppName(),
                testResult.getName(),
                testResult.getHostApp(),
                testResult.getHostOS(),
                (testResult.getHostDisplaySize() ? testResult.getHostDisplaySize().getWidth() : "width undefined"),
                (testResult.getHostDisplaySize() ? testResult.getHostDisplaySize().getHeight(): "height undefined"),
                testResult.getMatches(),
                testResult.getMismatches(),
                testResult.getMissing(),
                (testResult.getIsAborted() ? "aborted" : "no"));
        }
    }
}