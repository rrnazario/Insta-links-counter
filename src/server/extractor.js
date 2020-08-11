const puppeter = require('puppeteer')
const express = require('express')
var cors = require('cors')
const app = express();

app.use(cors());

// Read instagram page
app.get('/getMentions', async (req, res) => {
    async function loadMore(page, selector){
        const moreButton = await page.$(selector)
        if (moreButton) {
            console.log('button clicked')

            await moreButton.click()
            await page.waitFor(selector, {timeout: 3000}).catch(() => console.log("timeout"))
            await loadMore(page, selector)
        }
    }

    
    async function getComments(page, selector){
        //2 cifroes = todos os elementos
        //eval: pega todos os seletores e faz alguma operação
        //map: aplica alguma transformação no array que o chama
        const comments = await page.$$eval(selector, links => links.map(link => link.innerText))

        return comments;
    }
    
    const browser = await puppeter.launch();
    const page = await browser.newPage()
    await page.goto(req.query.url)

    await loadMore(page, '.dCJp8'); 

    const mentions = await getComments(page, '.C4VMK span a')
    const counted = countMentions(mentions)
    const sorted = sortMentionCounts(counted)
    sorted.forEach(item => console.log(item))

    await browser.close()
    console.log("Send items")

    // Respond with mentions
    res.send(sorted);    
});

// Count repeated profiles
function countMentions (mentions){
    const counter = {}
    mentions.forEach(element => {
        counter[element] = (counter[element] || 0) + 1
    });

    return counter
}

// Oder
sortMentionCounts = (mentions) => Object.entries(mentions).sort((a, b) => b[1] - a[1])

app.listen(4000);