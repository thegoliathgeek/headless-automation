
import * as express from 'express';
import {Request, Response} from 'express';
import * as puppeteer from 'puppeteer';



export default class LoginRegisterRoute{

    static Route(){
        const appExpress = express.Router();

        appExpress.get('/',(req: Request, res: Response)=>{
            res.status(200).json({
                error: false,
                message: `You are in wrong place`
            });
        });
;        appExpress.post('/ventis/login',async (req:Request, res:Response)=>{
            const {email, password} = req.body;
            const browser = await puppeteer.launch({
                args: ['--no-sandbox'],
                timeout: 10000,
                defaultViewport: {
                    'width': 1024, 'height': 1600
                },
                headless: process.env.HEADLESS === 'true' ? true : false
            });
            try {
                const page = await browser.newPage();
                await page.setViewport({'width': 1024, 'height': 1600});
                await page.goto("https://www.ventis.it/user/manage/", {waitUntil: "domcontentloaded"});
                await page.waitForSelector(".country__btn");
                await page.waitForSelector("#loginEmail");
                // console.log("ID loded");
                await page.type("#loginEmail", email);
                await page.type("#loginPassword", password);
                await page.click("#loginButton");
                await page.screenshot({path:  './images/'+ 'login.png', fullPage: true});
                // console.log('country__btn loaded')
                await page.click(".country__btn");
                await page.reload({waitUntil: "networkidle0"});
                await page.waitFor(1000);

                const loginEmailButt = await page.$('.menu__link menu__link--user');
                if(loginEmailButt){
                    res.status(200).json({
                        url: page.url(),
                        error: false
                    });
                }
                else{
                    res.status(200).json({
                        url: null,
                        error: true
                    });
                }
            } catch (err) {
                res.json({
                    error: true,
                    message: err.message
                });
            }
        });

        appExpress.post('/ventis/register',async (req:Request, res:Response)=>{
            const {email, password} = req.body;
            const browser = await puppeteer.launch({
                defaultViewport: {
                    'width': 1024, 'height': 1600
                },
                headless: process.env.HEADLESS === 'true' ? true : false
            });
            try {
                const page = await browser.newPage();
                await page.setViewport({'width': 1024, 'height': 1600});
                await page.goto("https://www.ventis.it/user/manage/", {waitUntil: "domcontentloaded"});
                await page.waitForSelector("#registerEmail");
                await page.waitForSelector(".country__btn");
                // console.log("ID loded");
                await page.click(".country__btn");
                await page.waitFor(1000);
                const spans = await page.$$('.login-register__tab-item');
                // console.log(spans);
                for(const span of spans){
                    await span.click()
                }
                await page.click('.login-register__checkbox');
                await page.waitFor(1000);
                await page.type("#registerEmail", email);
                await page.type("#registerPassword", password);
                await page.waitFor(2000);
                await page.click("#registerButton");
                await page.screenshot({path:  './images/'+ 'register.png', fullPage: true});
                // await page.waitForNavigation({waitUntil: "networkidle2"});
                // await page.click(".country__btn");
                await page.waitFor(2000);
                await page.reload({waitUntil: "domcontentloaded"});
                await page.waitFor(2000);
                const loginEmailButt = await page.$('body > header > div > ul > li.menu__item.menu__item--logged.menu__item--logged-in');
                if(loginEmailButt){
                    res.status(200).json({
                        url: page.url(),
                        error: false
                    });
                }
                else{
                    res.status(200).json({
                        url: null,
                        error: true
                    });
                }
            } catch (err) {
                res.json({
                    error: true,
                    message: err.message
                });
            }
        });
        
        return appExpress;
    }
}