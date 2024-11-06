import { writeFile } from "fs";
import { readFile } from "fs/promises";
import path from "path";
export const scriptService = {

  udateScriptString: async ({ ids, dates }: { ids: string, dates: string }) => {
    const scriptFilePath = path.join(process.cwd(), 'pages', 'script.txt');
    const idsFilePath = path.join(process.cwd(), 'pages', 'ids.txt');
    const datesFilePath = path.join(process.cwd(), 'pages', 'dates.txt');
    const mainStringPart = await readFile(scriptFilePath, { encoding: 'utf-8' });
      if(ids) {
       writeFile(idsFilePath, ids,()=>{
        console.log('ids successfully writed')
       })
      }
      if(dates) {
        writeFile(datesFilePath, dates,()=>{
          console.log('dates successfully writed')
         })
      }

    const idsStringPart = ids || await readFile(idsFilePath, { encoding: 'utf-8' });
    const datesStringPart = dates || await readFile(datesFilePath, { encoding: 'utf-8' });


    const endStringPart = `
        const ids = [${idsStringPart}];
        // needless dates:
        const dates = [${datesStringPart}];
        
        // Your token
        const TG_TOKEN = '7779717253:AAH_LJS1Tp3qIBpCcdN_JjF4lN06-A1AY7Y';
        // Your chatId
        const TG_CHAT_ID = '599469941';
      }
        
        const examTickets = new ExamTickets(dates, ids, TG_TOKEN, TG_CHAT_ID);
        examTickets.processTickets();
        `;

        
    return mainStringPart + endStringPart;
  }

}


