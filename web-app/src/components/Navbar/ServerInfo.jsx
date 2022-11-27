import { useEffect, useState } from "react";
import { Container, Loading, Popover, Text, Button, useTheme, Grid } from "@nextui-org/react";
import { RiHomeGearFill } from 'react-icons/ri'
import { api } from 'src/constants'

function ServerInfo() {
    const { theme } = useTheme();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [timerId, setTimerId] = useState();

    function updateServerStats(){
        if (loading || !data) return;
        setLoading(true);
        Promise.all([
            fetch(api.SY_CPU_TEMP).then(e => e.json()),
            fetch(api.SY_MEM).then(e => e.json())
        ]).then(e => {
            const { cpu } = data;
            setData({ cpu, temp: e[0], mem: e[1] });
            setLoading(false);
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await Promise.all([
                fetch(api.SY_CPU).then(e => e.json()),
                fetch(api.SY_CPU_TEMP).then(e => e.json()),
                fetch(api.SY_MEM).then(e => e.json())
            ]);
            setData({ cpu: res[0], temp: res[1], mem: res[2] });
            setLoading(false); 
        }
        fetchData();
    }, [])

    function onChange(isOpen){
        if(isOpen){
            if(timerId !== undefined) clearInterval(timerId);
            setTimerId(setInterval(updateServerStats, 3000));
        }else{
            clearInterval(timerId);
            setTimerId(undefined)
        }
    }

    return (
        <Popover placement="bottom-right" onOpenChange={onChange}>
            <Popover.Trigger>
                <Button bordered color="success" auto>
                    <RiHomeGearFill color={theme.colors.success.value} />
                </Button>
            </Popover.Trigger>
            <Popover.Content css={{ backgroundColor: "#26292B", padding: "1rem", color: "#ECEDEE", border: "solid 1px #ECEDEE" }}>
                <Container >
                    {data ? <div>
                        <Grid.Container justify="space-between" alignItems="center" gap={1} css={{padding:0}}>
                            <Grid>
                                <Text color="#9BA1A6" css={{ textAlign: "center" }}>{`Server info`}</Text>
                            </Grid>
                            <Grid css={{padding:0}}>
                                {loading ? <Loading size="sm" /> : null} 
                            </Grid>
                        </Grid.Container>
                        <Text color="#ECEDEE">{`Cpu ${data.cpu.manufacturer} ${data.cpu.speed} ghz`}</Text>
                        <Text color="#ECEDEE">{`Cpu fan speed ${data.temp.cpuFanSpeed} RPM`}</Text>
                        <Text color="#ECEDEE">{`Temperature ${data.temp.main}°`}</Text>
                        <Text color="#ECEDEE">{`Ram ${data.mem.active}mb / ${data.mem.total}mb `}</Text>
                    </div> : null}
                </Container>
            </Popover.Content>
        </Popover>

    );
}

export default ServerInfo;