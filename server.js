var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');

var app = express();
app.use(serveStatic(__dirname + "/dist"));

const automl = require('@google-cloud/automl');


var projectId = 'medhakcs2020'
var computeRegion = 'us-central1'
var modelId = 'TBL4730066037343518720'
var port = process.env.PORT || 5000;
app.listen(port);


app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.post('/api/automl', async function (req, res) {
  var inputs = req.body
    const client = new automl.v1beta1.PredictionServiceClient();

  //  var inputs = [{
  //   "stringValue": "1"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "0"
  // },
  // {
  //   "stringValue": "1"
  // }]

    const payload = {
        row: {
            values: inputs,
            
        },
    };

    // payloads = JSON.parse(payload)
    // payload.image = {imageBytes: content};
    const modelFullId = client.modelPath(projectId, computeRegion, modelId);
    // params is additional domain-specific parameters.
    // currently there is no additional parameters supported.
    const [response] = await client.predict({
        name: modelFullId,
        payload: payload,
        params: { feature_importance: true },

    });
    console.log('Prediction results:');
    count = 0
    var score = Number.MIN_VALUE
    var disease= ""
    response.payload.forEach(result => {
        // console.log("stringvalue",result.tables.value.stringValue)
        // console.log("score",result.tables.score)
        if (score <  result.tables.score) {
          score =  result.tables.score
          disease = result.tables.value.stringValue
        }
        count+=1
        // console.log(`Predicted class name: ${result.displayName}`);
        // console.log(`Predicted class score: ${result.classification.score}`);
    });
    data = {}
    console.log('count',score)
    console.log('disease',disease)
    data['score'] = score 
    data['disease'] = disease
    res.json(data)

});