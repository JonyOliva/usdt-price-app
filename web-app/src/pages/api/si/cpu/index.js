import si from 'systeminformation';

export default async function handler(req, res) {
    try{
        let cpuInfo = await si.cpu();
        return res.status(200).json(cpuInfo);
    }catch(e){
        return res.status(500).json({error: e.message});
    }
}