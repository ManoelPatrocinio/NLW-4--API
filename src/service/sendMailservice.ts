import { resolve4 } from "dns";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from 'handlebars'
import fs from 'fs';

class SendMailService {

    private client: Transporter

    constructor() {
        // criar uma conta teste smtp 
        nodemailer.createTestAccount().then(account =>{
            const tranport = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure, 
                auth: {
                  user: account.user,
                  pass: account.pass,
                },
              });
            
            this.client = tranport;  
        });
    }

    async execute(to:string, subject:string, valiable: object, path:string){
        
        const templateFileContent = fs.readFileSync(path).toString("utf8"); //leitura do arquivo
        
        const mailTemplateParse  = handlebars.compile(templateFileContent);
        const html = mailTemplateParse(valiable); //passa as variaveis que a aplicação irá receber 

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com.br>",
        });

        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default new SendMailService();