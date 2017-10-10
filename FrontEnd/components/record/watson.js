// {
//   "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
//   "username": "e26a530d-3f37-4895-a33c-411dc65c00a8",
//   "password": "FWtR721NmJrR"
// }
//
// curl --user "e26a530d-3f37-4895-a33c-411dc65c00a8":"FWtR721NmJrR" \
// "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=Do%20you%20want%20to%20know%20what%20the%20ultimate%20secret%20is?%20Laura%20did.%20The%20secret%20of%20knowing%20who%20killed%20you.%20Evolution?%20they%20said%20to%20themselves,%20Who%20needs%20it?%20May%20the%20wind%20under%20your%20wings%20bear%20you%20where%20the%20sun%20sails%20and%20the%20moon%20walks.&features=sentiment,keywords"

import axios from 'axios';


String.prototype.convert_to_url = function() {
  let response = this.split(" ").join("%20");
  return response + "&features=sentiment,keywords";
};

class WatsonAnalyzer {
  constructor() {
  }
  static analyze(string) {
    let urlString = string.convert_to_url();
    let sentimentScore = 0;
    let sentimentLabel = "";
    let keywords = [];
    // console.log(urlString);
    let config = {'Authorization': 'Basic ZTI2YTUzMGQtM2YzNy00ODk1LWEzM2MtNDExZGM2NWMwMGE4OkZXdFI3MjFObUpyUg=='};
    axios.get(`https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&text=${urlString}`, {
      headers: config
    }
    )
    .then((response) => {
      // console.log(response);
      sentimentLabel = response.data.sentiment.document.label;
      sentimentScore = response.data.sentiment.document.score;
      // console.log(sentimentLabel, sentimentScore);
      response.data.keywords.map(index => {
        keywords.push(Object.values(index));
      });
      console.log(sentimentLabel, sentimentScore, keywords);
    })
    .catch((error) => {
      console.log(error);
    });

    return [sentimentScore, sentimentLabel, keywords];
  }
}

module.exports = WatsonAnalyzer;
