import si from 'systeminformation';
import util from 'util';
import {exec} from 'child_process';
const execPs = util.promisify(exec);

export default async function handler(req, res) {
    try{
        let cpuTemp = await si.cpuTemperature();
        let command;
        try{
            command = await execPs("sensors"); //{stdout, stderr}
        }catch(e){
            console.log(e)
            command = {stdout: ""}
        }
        const speeddata = command.stdout.split('\n')[12];
        const index = speeddata.indexOf('RPM');
        cpuTemp.cpuFanSpeed = speeddata.substring(index-5, index).trim();
        return res.status(200).json(cpuTemp);
    }catch(e){
        return res.status(500).json({error: e.message});
    }
}