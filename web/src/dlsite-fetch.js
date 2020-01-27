export default {
  parseCode(links) {
    const codes = [];
    for (let i = 0; i < links.length; ++i) {
      let roundedId = GetRoundedId(links[i].code.substring(2, links[i].code.length));
      codes.push({
        name: links[i].name,
        download: links[i].link,
        size: links[i].size,
        linkJp: "http://www.dlsite.com/maniax/work/=/product_id/" + links[i].code + ".html",
        linkEn: "http://www.dlsite.com/ecchi-eng/work/=/product_id/" + links[i].code.replace("RJ", "RE") + ".html",
        imagePath: [
          "http://img.dlsite.jp/modpub/images2/work/doujin/RJ" + roundedId + "/" + links[i].code + "_img_main.jpg",
          "http://img.dlsite.jp/modpub/images2/work/doujin/RE" + roundedId + "/" + links[i].code.replace("RJ", "RE") + "_img_main.jpg"
        ]
      })
    }

    return codes;
  }
}

const codeDigitCount = 6;

function GetRoundedId(idNumber)
{
	idNumber = parseInt(idNumber);
	idNumber = Math.ceil(idNumber / 1000) * 1000;
	idNumber = LeadingZeroes(idNumber, codeDigitCount);
	return idNumber;
}

function LeadingZeroes(num, size)
{
    var str = num.toString();
    while (str.length < size) {
      str = "0" + str;
    }
    return str;
}