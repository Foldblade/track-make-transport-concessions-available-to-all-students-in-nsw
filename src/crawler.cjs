const axios = require("axios");
const cheerio = require("cheerio");
const JSON5 = require("json5");
const fs = require("fs");

require("json5/lib/register");

const url = "https://www.parliament.nsw.gov.au/la/pages/epetitions-list.aspx";
let data = require("./data.json5");

async function main() {
  let new_data = await fetchData();
  if (new_data != null) {
    data.push(new_data);
  } else {
    console.log("Null new data");
  }
  fs.writeFile(
    __dirname + "/" + "data.json5",
    JSON5.stringify(data, null, 2),
    (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    }
  );
}

main();

async function fetchData() {
  let datetime = Date.now();

  try {
    let response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    let trs = $("table:first > tbody > tr");
    for (let i = 0; i < trs.length; i++) {
      let tds = $(trs[i]).find("td");
      if (
        $(tds[0]).text() ==
        "Make transport concessions available to all students in NSW"
      ) {
        return {
          time: datetime,
          cnt: parseInt($(tds[3]).text().replace(",", "")),
        };
      }
    }
  } catch (error) {
    console.error(error);
  }
}
