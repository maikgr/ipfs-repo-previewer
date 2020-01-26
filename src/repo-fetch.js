import request from 'request-promise';
import url from 'url';
import { parse } from 'node-html-parser';

export default {
  getLinks: async function (link) {
    const destination = url.parse(link);
    return request.get(link)
      .then((response) => {
        const root = parse(response).querySelector('table');
        const parent = root.querySelectorAll('tr').filter(e => e.text.toUpperCase().includes('RJ') || e.text.toUpperCase().includes('RE'));
        return parent.map(tr => {
          let game = tr.querySelector('a');
          let tds = tr.querySelectorAll('td');
          return {
            code: game.text.split(' ')[0].replace('RE', 'RJ'),
            name: game.text,
            link: destination.protocol + "//" + destination.host + game.attributes.href,
            size: tds[tds.length - 1].text
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
}