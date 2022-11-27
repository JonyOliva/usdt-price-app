import si from 'systeminformation';

export default async function handler(req, res) {
    try{
        let memInfo = await si.mem();
        for (const key of Object.keys(memInfo)) {
            memInfo[key] = Math.round(memInfo[key] / 1024 / 1024);
        }
        return res.status(200).json(memInfo);
    }catch(e){
        return res.status(500).json({error: e.message});
    };
}